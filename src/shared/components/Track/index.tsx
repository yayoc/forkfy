import * as React from "react";
import { Track } from "shared/types";

export default (props: Track) => (
  <div>
    <h3>{props.name}</h3>
    <p>{props.artists.map(a => a.name).join(",")}</p>
    <img src={props.album.images[0].url} width="30" height="30" />
  </div>
);
