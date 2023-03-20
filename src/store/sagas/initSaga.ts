import { call, put, take } from 'redux-saga/effects';
import { getChatListSaga } from './chats/chatListSaga';

export function* initSaga() {
  yield take('innit');
  yield put({ type: 'CHANEL_ON' });
  yield call(getChatListSaga);
}
