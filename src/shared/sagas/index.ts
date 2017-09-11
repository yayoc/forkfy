import { Effect, fork, all } from "redux-saga/effects";
import { watchFetchMeSaga, watchLogoutSaga } from "./auth";
import { watchSearchSaga, watchSearchMoreSaga } from "./search";
import { watchForkSaga, watchFetchSaga } from "./playlist";
export type SagaIterator = IterableIterator<Effect | Effect[]>;
export default function* rootSaga() {
  yield fork(watchFetchMeSaga);
  yield fork(watchLogoutSaga);
  yield fork(watchSearchSaga);
  yield fork(watchSearchMoreSaga);
  yield fork(watchForkSaga);
  yield fork(watchFetchSaga);
}
