import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { matchPath, StaticRouter as Router } from "react-router";
import { Provider } from "react-redux";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import template from "server/template";
import NotFound from "shared/components/NotFound";
import Routes, { routes } from "shared/routes";
import configureStore from "shared/store";
import { normalize, schema } from "normalizr";

import {
  getMe,
  searchPlaylists,
  createPlaylist,
  addTracksToPlaylist,
  getPlaylistTracks,
  getPlaylist
} from "server/api";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.dirname);
app.use("/static", express.static("./dist"));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cookieParser());

const requireAuthentication = (req: any, res: any, next: () => void) => {
  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    res.status(500).render("error", {});
    return;
  }
  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    res.status(500).render("error", {});
    return;
  }
  req.token = token;
  next();
};

app.all("/api/*", requireAuthentication);

interface AuthorizedReq {
  token: string;
}

app.get("/api/me", async (req, res, next) => {
  try {
    const me = await getMe((req as any).token);
    res.send(me);
  } catch (e) {
    res.status(500).render("error", { e });
  }
});

app.get("/api/search", async (req, res, next) => {
  try {
    const q = req.param("q");
    const offset = req.param("offset");
    const playlists = await searchPlaylists((req as any).token, q, offset);
    res.send(playlists);
  } catch (e) {
    res.status(500).render("error", { e });
  }
});

app.get("/api/users/:userId/playlists/:playlistId", async (req, res, next) => {
  try {
    const accessToken = (req as any).token;
    const userId = req.param("userId");
    const playlistId = req.param("playlistId");
    const response = await getPlaylist(accessToken, userId, playlistId);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).render("error", { e });
  }
});

app.post("/api/users/:userId/playlists", async (req, res, next) => {
  const accessToken = (req as any).token;
  const userId = req.param("userId");
  const ownUserId = req.body.ownUserId;
  const playlistId = req.body.playlistId;
  try {
    const playlist = await getPlaylist(accessToken, ownUserId, playlistId);
    // 1. Create own playlist
    const myPlaylist = await createPlaylist(
      accessToken,
      userId,
      `forked from ${playlist.name}`,
      false,
      false,
      playlist.description
    );
    // 2. Get tracks of the playlist.
    const uris = playlist.tracks.items.map((i: any) => i.track.uri);
    // 3. Add tracks into own playlist.
    const response = await addTracksToPlaylist(
      accessToken,
      userId,
      myPlaylist.id,
      uris
    );
    res.status(200).send(response);
  } catch (e) {
    res.status(500).render("error", { e });
  }
});

app.get("*", async (req, res) => {
  const match = routes.reduce(
    (acc, route) => matchPath(req.url, route) || acc,
    null
  );
  if (!match) {
    const m = renderToString(<NotFound />);
    res.status(404).send(m);
  }

  const { token } = req.cookies;

  const signinMarkup = renderToString(
    <Provider store={configureStore({})}>
      <Router location={req.url} context={{}}>
        <Routes />
      </Router>
    </Provider>
  );
  if (!token) {
    res.send(
      template({ markup: signinMarkup, title: "Signin", preloadedState: null })
    );
  }

  try {
    const me = await getMe(token);
    const authState = {
      accessToken: token,
      isAuthorized: true,
      isLoading: false,
      me
    };
    if (!req.originalUrl.match("/playlists/")) {
      const store = configureStore({ auth: authState });
      const markup = renderToString(
        <Provider store={store}>
          <Router location={req.url} context={{}}>
            <Routes />
          </Router>
        </Provider>
      );
      res.send(
        template({ markup, title: "", preloadedState: store.getState() })
      );
    } else {
      if (!match) {
        return;
      }
      const { userId, playlistId } = match.params as any;
      if (!userId || !playlistId) {
        return;
      }
      const playlist = await getPlaylist(token, userId, playlistId);
      const normalizedData = normalize(playlist, new schema.Entity("items"));
      const entityState = {
        entities: normalizedData.entities
      };
      const store = configureStore({
        auth: authState,
        entity: entityState
      });
      const markup = renderToString(
        <Provider store={store}>
          <Router location={req.url} context={{}}>
            <Routes />
          </Router>
        </Provider>
      );
      res.send(
        template({ markup, title: "", preloadedState: store.getState() })
      );
    }
  } catch (e) {
    res.send(
      template({ markup: signinMarkup, title: "Signin", preloadedState: null })
    );
  }
});
/* tslint:disable:no-console */
app.listen(3000, () => console.log("listening on port 3000"));
/* tslint:enable:no-console */
