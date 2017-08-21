import { Effect, fork } from "redux-saga/effects";
import authSaga from "./auth";
import searchSaga from "./search";
export type SagaIterator = IterableIterator<Effect | Effect[]>;

export default function* rootSaga(): SagaIterator {
  [yield fork(authSaga), yield fork(searchSaga)];
}
