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
  fork: (id: string) => void;
}

class Playlists extends React.Component<OwnProps & StateProps & DispatchProps> {
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

const mapDispatchToProps = (dispatch: Dispatch<string>): DispatchProps => {
  return {
    fork: () => {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
