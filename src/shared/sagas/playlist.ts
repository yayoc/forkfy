import { call, Effect, put, select } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
import { SagaIterator } from "./index";

import { ActionWithPayload, ActionWithoutPayload } from "shared/helpers/types";
import { fork } from "shared/helpers/api";
import { Types, actions, ForkRequestPayload } from "shared/modules/playlist";
import { getAuth } from "shared/modules/auth";

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
