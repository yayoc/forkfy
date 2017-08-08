import Header from "components/Header";
import About from "containers/About";
import Categories from "containers/Categories";
import Friends from "containers/Friends";
import Playlists from "containers/Playlists";
import Top from "containers/Top";
import * as React from "react";
import {Route, Switch } from "react-router-dom";

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
