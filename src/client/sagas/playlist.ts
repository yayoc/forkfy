import { call, Effect, put, select } from "redux-saga/effects";
import { ActionWithPayload, ActionWithoutPayload } from "client/helpers/types";
import { fork } from "client/helpers/api";
import { Types, actions, ForkRequestPayload } from "client/modules/playlist";
import { getAuth } from "client/modules/auth";
import { takeLatest } from "redux-saga";
import { SagaIterator } from "./index";

function* forkSaga(
  action: ActionWithPayload<Types.FORK_REQUEST, ForkRequestPayload>
): Iterable<Effect> {
  try {
    const auth = yield select(getAuth);
    const { playlistId, ownUserId } = action.payload;
    const res = yield call(
      fork,
      auth.accessToken,
      auth.me.id,
      ownUserId,
      playlistId
    );
    yield put(actions.forkSuccess());
  } catch (e) {
    yield put(actions.forkFailed());
  }
}

export function* watchForkSaga(): SagaIterator {
  yield* takeLatest(Types.FORK_REQUEST, forkSaga);
}
