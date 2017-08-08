import { Effect, fork } from "redux-saga/effects";

type SagaIterator = IterableIterator<Effect | Effect[]>;

export default function* rootSaga(): SagaIterator {}
