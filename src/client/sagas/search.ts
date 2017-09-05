import { searchPlaylist } from "client/helpers/api";
import { ActionWithPayload, ActionWithoutPayload } from "client/helpers/types";
import { getAuth } from "client/modules/auth";
import { actions, Types, getSearch } from "client/modules/search";
import { actions as entityAction } from "client/modules/entity";
import { takeEvery } from "redux-saga";
import { call, Effect, put, select } from "redux-saga/effects";
import { SagaIterator } from "./index";
import { normalize, schema } from "normalizr";
import { getQueryParams } from "client/helpers/api";

const item = new schema.Entity("items");
export const responseSchema = { items: new schema.Array(item) };

function* searchSaga(
  action: ActionWithPayload<Types.SEARCH_REQUEST, string>
): Iterable<Effect> {
  try {
    const q = action.payload;
    const search = yield select(getSearch);
    const auth = yield select(getAuth);
    const res = yield call(searchPlaylist, auth.accessToken, q);
    const normalizedData = normalize(res.playlists, responseSchema);
    yield put(actions.searchSuccess(normalizedData.result));
    yield put(entityAction.setEntities(normalizedData.entities));
  } catch (e) {
    yield put(actions.searchFailed(e));
  }
}

function* watchSearchSaga(): SagaIterator {
  yield* takeEvery(Types.SEARCH_REQUEST, searchSaga);
}

function* searchMoreSaga(
  action: ActionWithoutPayload<Types.SEARCH_MORE_REQUEST>
): Iterable<Effect> {
  try {
    const search = yield select(getSearch);
    const auth = yield select(getAuth);
    const queries = getQueryParams(search.result.next);
    const res = yield call(
      searchPlaylist,
      auth.accessToken,
      queries.query,
      queries.offset
    );
    const normalizedData = normalize(res.playlists, responseSchema);
    yield put(actions.searchMoreSuccess(normalizedData.result));
    yield put(entityAction.setEntities(normalizedData.entities));
  } catch (e) {
    yield put(actions.searchMoreFailed(e));
  }
}

function* watchSearchMoreSaga(): SagaIterator {
  yield* takeEvery(Types.SEARCH_MORE_REQUEST, searchMoreSaga);
}

export { watchSearchSaga, watchSearchMoreSaga };
