import asyncComponent from "client/components/AsyncComponent";

const Top = asyncComponent(() =>
  import("client/containers/Top" /* webpackChunkName: "top" */).then(
    module => module.default
  )
);

const Categories = asyncComponent(() =>
  import("client/containers/Categories" /* webpackChunkName: "categories" */).then(
    module => module.default
  )
);

const Playlists = asyncComponent(() =>
  import("client/containers/Playlists" /* webpackChunkName: "playlists" */).then(
    module => module.default
  )
);

const Friends = asyncComponent(() =>
  import("client/containers/Friends" /* webpackChunkName: "friends" */).then(
    module => module.default
  )
);

const About = asyncComponent(() =>
  import("client/containers/About" /* webpackChunkName: "about" */).then(
    module => module.default
  )
);

export default {
  About,
  Categories,
  Friends,
  Playlists,
  Top
};
