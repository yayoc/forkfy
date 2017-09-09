import { getMe } from "client/helpers/api";
import { ActionWithPayload } from "client/helpers/types";
import { actions, Types, getAuth, COOKIE_PATH } from "client/modules/auth";
import { takeEvery } from "redux-saga";
import { call, Effect, put, select } from "redux-saga/effects";
import { SagaIterator } from "./index";
import * as Cookies from "js-cookie";

function* fetchMeSaga(
  action: ActionWithPayload<Types.SET_ACCESS_TOKEN, string>
): Iterable<Effect> {
  try {
    const accessToken = action.payload;
    Cookies.set(COOKIE_PATH, accessToken);
    const res = yield call(getMe, accessToken);
    yield put(actions.fetchMeSuccess(res));
  } catch (e) {
    yield put(actions.fetchMeFailed(e));
  }
}

export function* watchFetchMeSaga(): SagaIterator {
  yield* takeEvery(Types.SET_ACCESS_TOKEN, fetchMeSaga);
}

function* logoutSaga(): Iterable<Effect> {
  Cookies.remove(COOKIE_PATH);
}


export function* watchLogoutSaga(): SagaIterator {
  yield* takeEvery(Types.LOGOUT, logoutSaga);
}
