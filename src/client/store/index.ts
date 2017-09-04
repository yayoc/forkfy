import rootReducer from "client/modules";
import rootSaga from "client/sagas";
import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";

export default function configureStore(initialState: {}): Store<{}> {
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (typeof window !== "undefined") {
    store = createStore(
      rootReducer,
      initialState,
      //   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      //     (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      // ],
      applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
  } else {
    store = createStore(rootReducer, initialState);
  }
  return store;
}
