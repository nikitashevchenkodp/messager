import { all } from 'redux-saga/effects';
import { initSaga } from './initSaga';
import { loginSaga } from './auth/loginSaga';

import { socketSaga } from './sockets';
import { messagesFlow } from './messages';
import { signupSaga } from './auth/signupSaga';
import { deleteChatIfNoMessages } from './chats/deleteChatIfNoMessages';

export function* rootSaga() {
  yield all([
    loginSaga(),
    signupSaga(),
    initSaga(),
    socketSaga(),
    messagesFlow(),
    deleteChatIfNoMessages()
  ]);
}
