import { call, put, take } from 'redux-saga/effects';
import { loadInitDataSaga } from './messages/loadInitData';

export function* initSaga() {
  yield take('innit');
  yield put({ type: 'CHANEL_ON' });
  yield call(loadInitDataSaga);
}
