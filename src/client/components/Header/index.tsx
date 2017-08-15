import * as React from "react";
import { NavLink } from "react-router-dom";

const s = require("./Header.scss");

function Header() {
  return (
    <header className={s.header}>
      <NavLink to="/">Top</NavLink>
      <NavLink to="/categories/toplists/playlists">Categories</NavLink>
      <NavLink to="/friends">Friends</NavLink>
      <NavLink to="/about">About</NavLink>
    </header>
  );
}

export default Header;
