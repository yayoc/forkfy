import Header from "client/components/Header";
import About from "client/containers/About";
import Categories from "client/containers/Categories";
import Friends from "client/containers/Friends";
import Playlists from "client/containers/Playlists";
import Top from "client/containers/Top";
import * as React from "react";
import { Route, Switch } from "react-router-dom";

export default () =>
  <div>
    <Header />
    <Switch>
      <Route component={Top} path="/" exact />
      <Route component={Categories} path="/categories/:categoryId/playlists" />
      <Route component={Playlists} path="/playlists/:playlistId" />
      <Route component={Friends} path="/friends" />
      <Route component={About} path="/about" />
    </Switch>
  </div>;
