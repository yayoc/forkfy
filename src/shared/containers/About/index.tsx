import * as React from "react";

const grid = require("shared/assets/styles/flexboxgrid.min.css");
const s = require("./About.scss");

export default () => (
  <div className={`${grid.row} ${grid["center-xs"]}`}>
    <div className={grid["col-xs-10"]}>
      <h1>About Forkfy</h1>
      <p className={s.p}>
        Forkfy is a web applicaiton for forking playlists to your playlists on
        Spotify. <br />
        A personal project, this is powerd by Spotify APIs. <br />
        All of source codes are hosted on{" "}
        <a target="_blank" href="https://github.com/yayoc/forkfy">
          Github
        </a>{" "}
        publicly. <br />
        If you have feedbacks, please let me know. I am reachable on{" "}
        <a target="_blank" href="https://twitter.com/yayoc_">
          twitter(@yayoc_)
        </a>. - Nobuhide Yayoshi
      </p>
      <div>
        <a
          href="https://twitter.com/share"
          className="twitter-share-button"
          data-url="http://forkfy.yayoc.com"
          data-text="Forking playlist on spotify"
          data-via="yayoc_"
          data-size="large"
        >
          Tweet
        </a>
        <a
          className="github-button"
          href="https://github.com/yayoc/forkfy"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star yayoc/forkfy on GitHub"
        >
          Star
        </a>
      </div>
    </div>
  </div>
);
