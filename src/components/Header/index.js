import React from "react";
import { NavLink } from "react-router-dom";

export default () =>
  <header>
    <NavLink to="/">Top</NavLink>
    <NavLink to="/categories/toplists/playlists">Categories</NavLink>
    <NavLink to="/friends">Friends</NavLink>
    <NavLink to="/about">About</NavLink>
  </header>;
