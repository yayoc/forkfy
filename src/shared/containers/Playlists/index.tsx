import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { match } from "react-router";
import { Link } from "react-router-dom";
import { ReduxState } from "shared/helpers/types";
import { Item } from "shared/types";
import { actions } from "shared/modules/playlist";
import authorization from "shared/containers/Auth";
import Track from "shared/components/Track";

const s = require("./Playlist.scss");
const grid = require("shared/assets/styles/flexboxgrid.min.css");

interface StateProps {
  playlist: Item;
}

interface Params {
  playlistId: string;
}

interface OwnProps {
  match: match<Params>;
}

interface DispatchProps {
  fork: (ownUserId: string) => void;
}

class Playlists extends React.Component<OwnProps & StateProps & DispatchProps> {
  public fork = () => {
    const { fork, playlist } = this.props;
    fork(playlist.owner.id);
  };

  public render() {
    const { playlist } = this.props;
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
              <button className={s.forkButton} onClick={this.fork}>
                Fork this playlist
              </button>
              {playlist.tracks.items && (
                <div>
                  <h3>Tracks</h3>
                  {playlist.tracks.items.map(trackItem => (
                    <Track {...trackItem.track} />
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
  return {
    playlist:
      state.entity && state.entity.entities
        ? state.entity.entities.items[ownProps.match.params.playlistId]
        : null
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<string>,
  ownProps: OwnProps
): DispatchProps => {
  return {
    fork: (ownUserId: string) => {
      dispatch(
        actions.forkRequest(ownProps.match.params.playlistId, ownUserId)
      );
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(authorization(Playlists));
