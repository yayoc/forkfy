import { Effect, fork, all } from "redux-saga/effects";
import authSaga from "./auth";
import { watchSearchSaga, watchSearchMoreSaga } from "./search";
export type SagaIterator = IterableIterator<Effect | Effect[]>;
export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(watchSearchSaga);
  yield fork(watchSearchMoreSaga);
}
