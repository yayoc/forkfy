import { searchPlaylist } from "client/helpers/api";
import { ActionWithPayload } from "client/helpers/types";
import { getAuth } from "client/modules/auth";
import { actions, Types } from "client/modules/search";
import { takeEvery } from "redux-saga";
import { call, Effect, put, select } from "redux-saga/effects";
import { SagaIterator } from "./index";

function* doSearchSaga(
  action: ActionWithPayload<Types.SEARCH_REQUEST, string>
): Iterable<Effect> {
  try {
    const q = action.payload;
    const auth = yield select(getAuth);
    const res = yield call(searchPlaylist, auth.accessToken, q);
    yield put(actions.searchSuccess(res.playlists));
  } catch (e) {
    yield put(actions.searchFailed(e));
  }
}

export default function* searchSaga(): SagaIterator {
  yield* takeEvery(Types.SEARCH_REQUEST, doSearchSaga);
}
