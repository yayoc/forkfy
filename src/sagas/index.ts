import { Effect, fork } from "redux-saga/effects";
import authSaga from "./auth";
export type SagaIterator = IterableIterator<Effect | Effect[]>;

export default function* rootSaga(): SagaIterator {
  yield fork(authSaga);
}
