import * as React from "react";
import { Link } from "react-router-dom";
import { Item } from "shared/types";

interface OwnPros {
  playlist: Item;
}

export default class Playlist extends React.Component<OwnPros> {
  public render() {
    const { playlist } = this.props;
    const imageUrl = playlist.images.length > 0 ? playlist.images[0].url : "";
    return (
      <Link to={`/users/${playlist.owner.id}/playlists/${playlist.id}`}>
        <img src={imageUrl} width={300} height={300} />
      </Link>
    );
  }
}
