import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { ReduxState } from "shared/helpers/types";
import { Item } from "shared/types";
import { actions, getPlaylist } from "shared/modules/playlist";
import authorization from "shared/containers/Auth";
import Track from "shared/components/Track";
import Loader from "shared/components/Loader";

const s = require("./Playlist.scss");
const grid = require("shared/assets/styles/flexboxgrid.min.css");

interface StateProps {
  playlist: Item;
  isTracksLoading: boolean;
  isForking: boolean;
  isForked: boolean;
}

interface Params {
  playlistId: string;
  userId: string;
}

interface OwnProps {
  match: match<Params>;
}

interface DispatchProps {
  fork: () => void;
  fetch: () => void;
}

class Playlists extends React.Component<OwnProps & StateProps & DispatchProps> {
  public fork = () => {
    const { fork } = this.props;
    fork();
  };

  public componentDidMount() {
    const { fetch, playlist } = this.props;
    if (!playlist.tracks.items) {
      fetch();
    }
  }

  public render() {
    const { playlist, isTracksLoading, isForked, isForking } = this.props;
    return (
      <div>
        <div className={`${grid.row} ${grid["center-xs"]}`}>
          {playlist && (
            <div>
              <img src={playlist.images[0].url} width={300} height={300} />
              <h1>{playlist.name}</h1>
              <p>
                by
                <a
                  className={s.ownerId}
                  href={playlist.owner.external_urls.spotify}
                >
                  {playlist.owner.id}
                </a>
              </p>
              <p>collaborative: {playlist.collaborative.toString()}</p>
              <a
                className={s.linkSpotify}
                href={playlist.external_urls.spotify}
              >
                Listen on Spotify
              </a>
              {isForked ? (
                <button className={s.forkButton} disabled>
                  Forked
                </button>
              ) : (
                <button className={s.forkButton} onClick={this.fork}>
                  {isForking ? "Forking..." : "Fork this playlist"}
                </button>
              )}
              {isTracksLoading && <Loader />}
              {playlist.tracks.items && (
                <div>
                  <h3>Tracks</h3>
                  {playlist.tracks.items.map(trackItem => (
                    <Track key={trackItem.track.id} {...trackItem.track} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState, ownProps: OwnProps): StateProps => {
  const playlistState = getPlaylist(state);
  const { playlistId } = ownProps.match.params;
  return {
    playlist:
      state.entity && state.entity.entities
        ? state.entity.entities.items[playlistId]
        : null,
    isTracksLoading: playlistState.isTracksLoading,
    isForking: playlistState.isForking,
    isForked: playlistState.forkedPlaylistIds.indexOf(playlistId) !== -1
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<string>,
  ownProps: OwnProps
): DispatchProps => {
  return {
    fork: () => {
      dispatch(
        actions.forkRequest(
          ownProps.match.params.playlistId,
          ownProps.match.params.userId
        )
      );
    },
    fetch: () => {
      dispatch(
        actions.fetchRequest(
          ownProps.match.params.playlistId,
          ownProps.match.params.userId
        )
      );
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(authorization(Playlists));
