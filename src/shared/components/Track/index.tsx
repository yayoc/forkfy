import * as React from "react";
import { Track } from "shared/types";

const grid = require("shared/assets/styles/flexboxgrid.min.css");
const s = require("./Track.scss");

export default (props: Track) => (
  <div className={`${grid.row} ${s.track}`}>
    <div className={`${grid["col-xs-offset-1"]}  ${grid["col-xs-2"]}`}>
      <img
        src={props.album.images.length > 0 ? props.album.images[0].url : ""}
        width="45"
        height="45"
      />
    </div>
    <div className={`${grid["col-xs-9"]} ${s.content}`}>
      <p className={s.name}>
        <a href={props.href} target="_blank">
          {props.name}
        </a>
      </p>
      <p className={s.artistName}>{props.artists.map(a => a.name).join(",")}</p>
    </div>
  </div>
);
