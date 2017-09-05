import * as React from "react";
import { Link } from "react-router-dom";
import { Item } from "client/types";

interface OwnPros {
  playlist: Item;
}

export default class Playlist extends React.Component<OwnPros> {
  public render() {
    const { playlist } = this.props;
    return (
      <Link to={`/users/${playlist.owner.id}/playlists/${playlist.id}`}>
        <img src={playlist.images[0].url} width={300} height={300} />
      </Link>
    );
  }
}
