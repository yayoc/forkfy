import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { match } from "react-router";
import { ReduxState } from "client/helpers/types";
import { Item } from "client/types";
import { actions } from "client/modules/playlist";
import authorization from "client/containers/Auth";

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
        {playlist && (
          <div>
            <img src={playlist.images[0].url} width={300} height={300} />
            <p>{playlist.name}</p>
            <button onClick={this.fork}>Fork this playlist</button>
          </div>
        )}
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
