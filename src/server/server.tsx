import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { matchPath, StaticRouter as Router } from "react-router";
import { Provider } from "react-redux";
import template from "server/template";
import NotFound from "client/components/NotFound";
import Routes from "client/routes";
import configureStore from "client/store";

const routes = [
  "/",
  "/playlists/:playlistId",
  "/friends",
  "/categories/:categoryId/playlists",
  "/about"
];

const app = express();

app.set("view engine", "ejs");
app.set("views", path.dirname);
app.use("/static", express.static("./dist"));
app.use(morgan("combined"));

app.get("*", (req, res) => {
  const match = routes.reduce(
    (acc, route) => matchPath(req.url, { path: route, exact: true }) || acc,
    null
  );
  if (!match) {
    const m = renderToString(<NotFound />);
    res.status(404).send(m);
  }
  const context = {};
  const store = configureStore();
  const markup = renderToString(
    <Provider store={store}>
      <Router location={req.url} context={context}>
        <Routes />
      </Router>
    </Provider>
  );
  res.send(template({ markup, title: "" }));
});
/* tslint:disable:no-console */
app.listen(3000, () => console.log("listening on port 3000"));
/* tslint:enable:no-console */
