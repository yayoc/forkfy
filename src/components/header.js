import React from "react";
import { NavLink } from "react-router-dom";

export default () =>
  <header>
    <NavLink to="/">index</NavLink>
    <NavLink to="/about">about</NavLink>
  </header>;
