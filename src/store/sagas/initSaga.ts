import { call, put, take } from 'redux-saga/effects';
import { authenticationActions } from 'store/slices/authentication';
import { loadInitDataSaga } from './messages/loadInitData';

export function* initSaga(): any {
  while (true) {
    const { payload } = yield take(authenticationActions.setAccessToken.type);
    if (!payload) return;
    yield call(loadInitDataSaga);
    yield put({ type: 'CHANEL_ON' });
  }
}
