import asyncComponent from "shared/components/AsyncComponent";

const Top = asyncComponent(() =>
  import("shared/containers/Top" /* webpackChunkName: "top" */).then(
    module => module.default
  )
);

const Playlists = asyncComponent(() =>
  import("shared/containers/Playlists" /* webpackChunkName: "playlists" */).then(
    module => module.default
  )
);

const About = asyncComponent(() =>
  import("shared/containers/About" /* webpackChunkName: "about" */).then(
    module => module.default
  )
);

export default {
  About,
  Playlists,
  Top
};
