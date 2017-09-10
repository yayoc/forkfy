import rootReducer from "shared/modules";
import rootSaga from "shared/sagas";
import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";

export default function configureStore(initialState: {}): Store<{}> {
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (typeof window !== "undefined") {
    if (initialState) {
      store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
      );
    } else {
      store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    }
    sagaMiddleware.run(rootSaga);
  } else {
    store = createStore(rootReducer, initialState);
  }
  return store;
}
