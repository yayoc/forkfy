import * as React from "react";
import { NavLink } from "react-router-dom";
import { ReduxState } from "client/helpers/types";
import { actions, getAuth, State as AuthState } from "client/modules/auth";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const s = require("./Header.scss");
const grid = require("client/assets/styles/flexboxgrid.min.css");

interface StateProps {
  authState: AuthState;
}

function Header(props: StateProps) {
  return (
    <header className={s.header}>
      <div className={`${grid.row} ${grid["between-xs"]}`}>
        <div className={grid["col-xs-2"]} />
        <div className={grid["col-xs-2"]}>
          <NavLink to="/">Forkfy</NavLink>
        </div>
        {props.authState.isAuthorized &&
        props.authState.me &&
        props.authState.me.images.length > 0 && (
          <div className={grid["col-xs-2"]}>
            <img
              className={s.avatar}
              width="30"
              height="30"
              src={props.authState.me.images[0].url}
            />
          </div>
        )}
      </div>
    </header>
  );
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const authState = getAuth(state);
  return {
    authState
  };
};

export default connect<StateProps, undefined, {}>(mapStateToProps)(Header);
