import { all } from 'redux-saga/effects';
import { initSaga } from './initSaga';
import { loginSaga } from './auth/loginSaga';

import { socketSaga } from './sockets';
import { messagesFlow } from './messages';
import { signupSaga } from './auth/signupSaga';

export function* rootSaga() {
  yield all([loginSaga(), signupSaga(), initSaga(), socketSaga(), messagesFlow()]);
}
