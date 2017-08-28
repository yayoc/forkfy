import {getMe} from 'client/helpers/api';
import {ActionWithPayload} from 'client/helpers/types';
import {actions, Types, getAuth} from 'client/modules/auth';
import {takeEvery} from 'redux-saga';
import {call, Effect, put, select} from 'redux-saga/effects';
import {SagaIterator} from './index';

function* fetchMeSaga(
  action: ActionWithPayload<Types.SET_ACCESS_TOKEN, string>,
): Iterable<Effect> {
  try {
    const auth = yield select(getAuth);
    yield call(getMe, auth.accessToken);
  } catch (e) {
    yield put(actions.fetchMeFailed(e));
  }
}

export default function* authSaga(): SagaIterator {
  yield* takeEvery(Types.SET_ACCESS_TOKEN, fetchMeSaga);
}
