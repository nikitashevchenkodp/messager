import { all } from 'redux-saga/effects';
import { chatListSaga } from './chats/chatListSaga';
import { loadMessagesSaga } from './messages/chatMessagesSaga';
import { initSaga } from './initSaga';
import { loginSaga } from './auth/loginSaga';
import { newChatCreated } from './chats/newChatCreated';
import { newMessage } from './messages/newMessageSaga';

import { IOSaga } from './sockets';

export function* rootSaga() {
  yield all([
    loginSaga(),
    initSaga(),
    IOSaga(),
    chatListSaga(),
    loadMessagesSaga(),
    newMessage(),
    newChatCreated()
  ]);
}
