import Header from "client/components/Header";
import About from "client/containers/About";
import Playlists from "client/containers/Playlists";
import Top from "client/containers/Top";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ScrollManager from "client/containers/ScrollManager";

const s = require("./Routes.scss");

export const routes = [
  {
    path: "/",
    component: Top,
    exact: true
  },
  {
    path: "/users/:userId/playlists/:playlistId",
    component: Playlists
  },
  {
    path: "/about",
    component: About
  }
];

export default () => (
  <div>
    <Header />
    <ScrollManager>
      <div className={s.content}>
        <Switch>{routes.map(route => <Route {...route} />)}</Switch>
      </div>
    </ScrollManager>
  </div>
);
