import asyncComponent from "components/AsyncComponent";

const Top = asyncComponent(() =>
  import("containers/Top" /* webpackChunkName: "top" */).then(
    module => module.default
  )
);

const Categories = asyncComponent(() =>
  import("containers/Categories" /* webpackChunkName: "categories" */).then(
    module => module.default
  )
);

const Playlists = asyncComponent(() =>
  import("containers/Playlists" /* webpackChunkName: "playlists" */).then(
    module => module.default
  )
);

const Friends = asyncComponent(() =>
  import("containers/Friends" /* webpackChunkName: "friends" */).then(
    module => module.default
  )
);

const About = asyncComponent(() =>
  import("containers/About" /* webpackChunkName: "about" */).then(
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
