import * as express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import * as morgan from "morgan";
import * as path from "path";
import { StaticRouter as Router, matchPath } from "react-router";
import template from "template";
import NotFound from "components/NotFound";
import Routes from "routes";

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
    const markup = renderToString(<NotFound />);
    res.status(404).send(markup);
  }
  const context = {};
  const markup = renderToString(
    <Router location={req.url} context={context}>
      <Routes />
    </Router>
  );
  res.send(template({ markup, title: "" }));
});

app.listen(3000, () => console.log("listening on port 3000"));
