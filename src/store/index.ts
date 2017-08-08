import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, Store } from "redux";
// import createLogger from 'redux-logger';
import rootReducer from "modules";
import rootSaga from "sagas";
type State = {};

export default function configureStore(): Store<State> {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
