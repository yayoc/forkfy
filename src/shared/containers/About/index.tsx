import * as React from "react";

const grid = require("shared/assets/styles/flexboxgrid.min.css");

export default () => (
  <div className={`${grid.row} ${grid["center-xs"]}`}>
    <h1>About Forkfy</h1>
    <p>
      Forkfy is a web applicaiton for forking playlists to your playlists on
      Spotify. <br />
      A personal project, this is powerd by Spotify APIs. <br />
      I have been learning TypeScript, SSR through creating this App. All of
      source codes are hosted on
      <a target="_blank" href="https://github.com/yayoc/forkfy">
        Github
      </a>
      publicly. If you have feedbacks, please let me know anytime to{" "}
      <a target="_blank" href="https://twitter.com/yayoc_">
        @yayoc
      </a>. - Nobuhide Yayoshi
    </p>
  </div>
);
