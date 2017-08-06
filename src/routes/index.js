import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../components/header";
import Index from "../components/index";
import About from "../components/about";

export default () =>
  <div>
    <Header />
    <Switch>
      <Route component={Index} path="/" exact />
      <Route component={About} path="/about" />
    </Switch>
  </div>;
