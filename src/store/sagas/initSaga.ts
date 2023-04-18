import { call, put, take } from 'redux-saga/effects';
import { authenticationActions } from 'store/slices/authentication';
import { loadInitDataSaga } from './messages/loadInitData';

export function* initSaga(): any {
  while (true) {
    console.log('work init');
    const { payload } = yield take(authenticationActions.setAccessToken.type);
    console.log('call init saga with payload', payload);

    if (!payload) return;
    console.log('works condition');
    yield call(loadInitDataSaga);
    yield put({ type: 'CHANEL_ON' });
  }
}
