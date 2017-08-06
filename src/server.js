import express from "express";
import React from "react";
import morgan from "morgan";
import { StaticRouter as Router, matchPath } from "react-router";
import render from "./render";
import Routes from "./routes";
import NoMatch from "./components/noMatch";

const routes = ["/", "/about"];

const app = express();

app.use("/static", express.static("./dist"));
app.use(morgan("combined"));

app.get("*", (req, res) => {
  const match = routes.reduce(
    (acc, route) => matchPath(req.url, route, { exact: true }) || acc,
    null
  );
  if (!match) {
    res.status(404).send(render(<NoMatch />));
  }
  const context = {};
  res.status(200).send(
    render(
      <Router location={req.url} context={context}>
        <Routes />
      </Router>
    )
  );
});

app.listen(3000, () => console.log("listening on port 3000"));
