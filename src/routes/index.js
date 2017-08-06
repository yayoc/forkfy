import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "components/Header";
import Top from "containers/Top";
import About from "containers/About";
import Categories from "containers/Categories";
import Playlists from "containers/Playlists";
import Friends from "containers/Friends";

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
