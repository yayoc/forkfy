import { getMe } from "client/helpers/api";
import { ActionWithPayload } from "client/helpers/types";
import { actions, Types, getAuth } from "client/modules/auth";
import { takeEvery } from "redux-saga";
import { call, Effect, put, select } from "redux-saga/effects";
import { SagaIterator } from "./index";
import * as Cookies from "js-cookie";

const COOKIE_PATH = "token";

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

export default function* authSaga(): SagaIterator {
  yield* takeEvery(Types.SET_ACCESS_TOKEN, fetchMeSaga);
}
