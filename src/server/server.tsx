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
import NotFound from "client/components/NotFound";
import Routes from "client/routes";
import configureStore from "client/store";
import { normalize, schema } from "normalizr";

import {
  getMe,
  searchPlaylists,
  createPlaylist,
  addTracksToPlaylist,
  getPlaylistTracks,
  getPlaylist
} from "server/api";

const routes = [
  "/",
  "/users/:userId/playlists/:playlistId",
  "/friends",
  "/categories/:categoryId/playlists",
  "/about"
];

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

app.get("/api/me", (req, res, next) => {
  getMe((req as any).token).then(data => {
    res.send(data);
  });
});

app.get("/api/search", (req, res, next) => {
  const q = req.param("q");
  const offset = req.param("offset");
  searchPlaylists((req as any).token, q, offset).then(data => {
    res.send(data);
  });
});

async function forkPlaylist(
  accessToken: string,
  userId: string,
  playlistId: string,
  ownUserId: string
) {
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
    return addTracksToPlaylist(accessToken, userId, myPlaylist.id, uris);
  } catch (e) {
    return Promise.reject(e);
  }
}

app.post("/api/users/:userId/playlists", (req, res, next) => {
  const accessToken = (req as any).token;
  const userId = req.param("userId");
  const ownUserId = req.body.ownUserId;
  const playlistId = req.body.playlistId;
  forkPlaylist(accessToken, userId, playlistId, ownUserId)
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.get("*", (req, res) => {
  const match = routes.reduce(
    (acc, route) => matchPath(req.url, { path: route, exact: true }) || acc,
    null
  );
  if (!match) {
    const m = renderToString(<NotFound />);
    res.status(404).send(m);
  }

  const { token } = req.cookies;
  if (!token) {
    const context = {};
    const store = configureStore({});
    const markup = renderToString(
      <Provider store={store}>
        <Router location={req.url} context={context}>
          <Routes />
        </Router>
      </Provider>
    );
    res.send(template({ markup, title: "", preloadedState: null }));
  }

  getMe(token)
    .then(data => {
      const authState = {
        accessToken: token,
        isAuthorized: true,
        isLoading: false,
        me: data
      };
      if (!req.originalUrl.match("/playlists/")) {
        const store = configureStore({ auth: authState });
        const context = {};
        const markup = renderToString(
          <Provider store={store}>
            <Router location={req.url} context={context}>
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
        getPlaylist(token, userId, playlistId).then(playlist => {
          const normalizedData = normalize(
            playlist,
            new schema.Entity("items")
          );
          const entityState = {
            entities: normalizedData.entities
          };
          const store = configureStore({
            auth: authState,
            entity: entityState
          });
          const context = {};
          const markup = renderToString(
            <Provider store={store}>
              <Router location={req.url} context={context}>
                <Routes />
              </Router>
            </Provider>
          );
          res.send(
            template({ markup, title: "", preloadedState: store.getState() })
          );
        });
      }
    })
    .catch(e => {
      const authState = {
        accessToken: null,
        isAuthorized: false,
        isLoading: false,
        me: null
      };
      const store = configureStore({ auth: authState });
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <Router location={req.url} context={context}>
            <Routes />
          </Router>
        </Provider>
      );
      res.send(
        template({ markup, title: "", preloadedState: store.getState() })
      );
    });
});
/* tslint:disable:no-console */
app.listen(3000, () => console.log("listening on port 3000"));
/* tslint:enable:no-console */
