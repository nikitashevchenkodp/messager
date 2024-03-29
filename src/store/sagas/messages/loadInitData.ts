import { call } from 'redux-saga/effects';
import { getChatListSaga } from '../chats/chatListSaga';
import { loadMessagesSaga } from './chatMessagesSaga';

export function* loadInitDataSaga(): any {
  const res = yield call(getChatListSaga);
  yield call(loadMessagesSaga, res.data);
}
