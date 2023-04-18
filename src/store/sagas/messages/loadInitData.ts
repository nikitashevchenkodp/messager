import { call } from 'redux-saga/effects';
import { getChatListSaga } from '../chats/chatListSaga';
import { loadUsers } from '../loadUsers';
import { loadMessagesSaga } from './chatMessagesSaga';

export function* loadInitDataSaga(): any {
  console.log('call loadInitdataSaga');
  const res = yield call(getChatListSaga);
  yield call(loadMessagesSaga, res.data);
  yield call(loadUsers);
}
