import { all } from 'redux-saga/effects';
import { chatListSaga } from './chatListSaga';
import { loadMessagesSaga } from './chatMessagesSaga';
import { initSaga } from './initSaga';
import { loginSaga } from './loginSaga';
import { newChatCreated } from './newChatCreated';
import { newMessage } from './newMessageSaga';

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
