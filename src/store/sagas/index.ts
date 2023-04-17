import { all, fork } from 'redux-saga/effects';
import { initSaga } from './initSaga';
import { loginSaga } from './auth/loginSaga';

import { socketSaga } from './sockets';
import { messagesFlow } from './messages';
import { signupSaga } from './auth/signupSaga';
import { deleteChatIfNoMessages } from './chats/deleteChatIfNoMessages';
import { checkAuthStatus } from './auth/chechAuthStatus';

export function* rootSaga() {
  yield all([
    loginSaga(),
    signupSaga(),
    checkAuthStatus(),
    initSaga(),
    socketSaga(),
    messagesFlow(),
    deleteChatIfNoMessages()
  ]);
}
