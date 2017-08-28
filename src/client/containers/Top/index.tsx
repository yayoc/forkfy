import Signin from "client/components/Signin";
import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import * as Waypoint from "react-waypoint";
import { callbackUrl, clientId } from "../../constants";
import { getAuth, State as AuthState, actions } from "client/modules/auth";
import {
  State as SearchState,
  actions as searchActions,
  getPlaylists,
  getSearch
} from "client/modules/search";
import { Playlists, Item } from "client/types";
import { ReduxState } from "client/helpers/types";
import Playlist from "client/components/Playlist";

const s = require("./Top.scss");

interface StateProps {
  authState: AuthState;
  playlists: Array<Item>;
  isLoading: boolean;
}

interface OwnProps {
  location: { [key: string]: any };
}

interface DispatchProps {
  search: (q: string) => void;
  searchMore: () => void;
}

class Top extends React.Component<OwnProps & StateProps & DispatchProps> {
  public state = {
    q: ""
  };
  public onChage = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ q: e.currentTarget.value });
  };

  public onClick = () => {
    const { search } = this.props;
    search(this.state.q);
  };

  public searchMore = () => {
    const { searchMore, isLoading } = this.props;
    if (!isLoading) {
      searchMore();
    }
  };

  public render() {
    const { authState, playlists, search } = this.props;
    return (
      <div className={s.content}>
        <h1>Search</h1>
        {authState.accessToken
          ? <div>
              <input
                className={s.input}
                onChange={this.onChage}
                value={this.state.q}
                placeholder="Artist name, keyword.. "
              />
              <button className={s.button} onClick={this.onClick}>
                Search
              </button>
              {playlists.length > 0 &&
                <div className={s.playlist}>
                  {playlists.map(i => <Playlist playlist={i} />)}
                  <Waypoint onEnter={this.searchMore} />
                </div>}
            </div>
          : <Signin {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const authState = getAuth(state);
  const playlists = getPlaylists(state);
  const search = getSearch(state);
  return { authState, playlists, isLoading: search.isLoading };
};

const mapDispatchToProps = (dispatch: Dispatch<string>): DispatchProps => {
  return {
    search: (q: string) => {
      dispatch(searchActions.searchRequest(q));
    },
    searchMore: () => {
      dispatch(searchActions.searchMoreRequest());
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Top);
