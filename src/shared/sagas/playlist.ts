import { call, Effect, put, select } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
import { SagaIterator } from "./index";

import { ActionWithPayload, ActionWithoutPayload } from "shared/helpers/types";
import { fork, fetchPlaylist } from "shared/helpers/api";
import { Types, actions, ForkRequestPayload } from "shared/modules/playlist";
import { actions as entityAction } from "shared/modules/entity";
import { getAuth } from "shared/modules/auth";
import { normalize, schema } from "normalizr";

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

function* fetchSaga(
  action: ActionWithPayload<Types.FETCH_REQUEST, ForkRequestPayload>
): Iterable<Effect> {
  try {
    const auth = yield select(getAuth);
    const { playlistId, ownUserId } = action.payload;
    const playlist = yield call(
      fetchPlaylist,
      auth.accessToken,
      playlistId,
      ownUserId
    );
    const normalizedData = normalize(playlist, new schema.Entity("items"));
    const entityState = {
      entities: normalizedData.entities
    };
    yield put(actions.fetchSuccess());
    yield put(entityAction.setEntities(normalizedData.entities));
  } catch (e) {
    yield put(actions.fetchFailed());
  }
}

export function* watchFetchSaga(): SagaIterator {
  yield* takeLatest(Types.FETCH_REQUEST, fetchSaga);
}
