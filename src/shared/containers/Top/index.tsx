import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as Waypoint from "react-waypoint";
import { callbackUrl, clientId } from "../../constants";
import {
  State as SearchState,
  actions as searchActions,
  getPlaylists,
  getSearch,
  Result
} from "shared/modules/search";
import Signin from "shared/components/Signin";
import { Playlists, Item } from "shared/types";
import { ReduxState } from "shared/helpers/types";
import Playlist from "shared/components/Playlist";
import authorization from "shared/containers/Auth";
import Loader from "shared/components/Loader";

const s = require("./Top.scss");
const grid = require("shared/assets/styles/flexboxgrid.min.css");

interface StateProps {
  playlists: Item[];
  isLoading: boolean;
  result: Result | null;
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

  public onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.props.search(this.state.q);
    }
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
    const { playlists, search, result, isLoading } = this.props;
    return (
      <div className={s.content}>
        <h1>Discover playlists</h1>
        <div>
          <div className={`${grid.row}`}>
            <div className={grid["col-xs-1"]} />
            <input
              className={`${s.input} ${grid["col-xs-7"]}`}
              onChange={this.onChage}
              value={this.state.q}
              placeholder="Artist name, keyword.. "
              onKeyDown={this.onKeyDown}
            />
            <button
              className={`${s.button} ${grid["col-xs-3"]}`}
              onClick={this.onClick}
            >
              Search
            </button>
          </div>
          {isLoading && <Loader />}
          {playlists.length > 0 && (
            <div>
              {result && (
                <p>
                  Result {result.offset + result.limit} /{result.total}
                </p>
              )}
              <div className={`${s.playlist} ${grid.row}`}>
                {playlists.map(i => (
                  <div className={grid["col-xs"]} key={i.id}>
                    <div className={grid.box}>
                      <Playlist playlist={i} />
                    </div>
                  </div>
                ))}
                <Waypoint onEnter={this.searchMore} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const playlists = getPlaylists(state);
  const search = getSearch(state);
  return {
    playlists,
    isLoading: search.isLoading,
    result: search.result
  };
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
)(authorization(Top));
