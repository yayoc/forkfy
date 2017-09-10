import Routes from "shared/routes";
import configureStore from "shared/store";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";

const preloadedState = (window as any).__PRELOADED_STATE__;
delete (window as any).__PRELOADED_STATE__;

const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("app")
);
