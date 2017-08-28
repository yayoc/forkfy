import * as React from "react";
import { NavLink } from "react-router-dom";

const s = require("./Header.scss");

function Header() {
  return (
    <header className={s.header}>
      <NavLink to="/">Forkfy</NavLink>
    </header>
  );
}

export default Header;
