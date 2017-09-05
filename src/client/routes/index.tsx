import Header from 'client/components/Header';
import About from 'client/containers/About';
import Categories from 'client/containers/Categories';
import Friends from 'client/containers/Friends';
import Playlists from 'client/containers/Playlists';
import Top from 'client/containers/Top';
import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

const s = require('./Routes.scss');

export default () =>
  <div>
    <Header />
    <div className={s.content}>
      <Switch>
        <Route component={Top} path="/" exact />
        <Route component={Playlists} path="/users/:userId/playlists/:playlistId" />
        <Route component={About} path="/about" />
      </Switch>
    </div>
  </div>;
