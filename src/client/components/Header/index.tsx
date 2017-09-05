import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { ReduxState } from "client/helpers/types";
import { actions, getAuth, State as AuthState } from "client/modules/auth";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const s = require("./Header.scss");
const grid = require("client/assets/styles/flexboxgrid.min.css");

interface StateProps {
  authState: AuthState;
}

class Header extends React.Component<StateProps> {
  public state = {
    isOpen: false
  };

  public signoutClicked = () => {};

  public menuClicked = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  public render() {
    const { authState } = this.props;
    return (
      <header className={s.header}>
        <div className={`${grid.row} ${grid["between-xs"]}`}>
          <div className={grid["col-xs-2"]} />
          <div className={grid["col-xs-2"]}>
            <NavLink to="/" className={s.logo}>
              Forkfy
            </NavLink>
          </div>
          {authState.isAuthorized &&
          authState.me &&
          authState.me.images.length > 0 && (
            <div className={grid["col-xs-2"]} onClick={this.menuClicked}>
              <img
                className={s.avatar}
                width="30"
                height="30"
                src={authState.me.images[0].url}
              />
              <div
                className={s.menu}
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href={authState.me.external_urls.spotify}
                    >
                      Check profile on Spotify
                    </a>
                  </li>
                  <li>
                    <a onClick={this.signoutClicked}>Signout</a>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const authState = getAuth(state);
  return {
    authState
  };
};

export default connect<StateProps, undefined, {}>(mapStateToProps)(Header);
