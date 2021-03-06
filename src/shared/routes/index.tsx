import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "shared/components/Header";
import About from "shared/containers/About";
import Playlists from "shared/containers/Playlists";
import Top from "shared/containers/Top";
import ScrollManager from "shared/containers/ScrollManager";

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
        <Switch>
          {routes.map(route => <Route key={route.path} {...route} />)}
        </Switch>
      </div>
    </ScrollManager>
  </div>
);
