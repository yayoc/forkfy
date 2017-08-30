import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapStateToProps } from "react-redux";
import { match } from "react-router";
import { ReduxState } from "client/helpers/types";
import { Item } from "client/types";

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
  fork: () => void;
}

class Playlists extends React.Component<OwnProps & StateProps & DispatchProps> {
  public fork = () => {
    const { fork } = this.props;
    fork();
  };

  public render() {
    const { playlist } = this.props;
    return (
      <div>
        {playlist &&
          <div>
            <img src={playlist.images[0].url} width={300} height={300} />
            <p>
              {playlist.name}
            </p>
            <button onClick={this.fork}>Fork this playlist</button>
          </div>}
      </div>
    );
  }
}
const mapStateToProps = (state: ReduxState, ownProps: OwnProps) => {
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
    fork: () => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
