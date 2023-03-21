import { all } from 'redux-saga/effects';
import { initSaga } from './initSaga';
import { loginSaga } from './auth/loginSaga';

import { socketSaga } from './sockets';
import { messagesFlow } from './messages';

export function* rootSaga() {
  yield all([loginSaga(), initSaga(), socketSaga(), messagesFlow()]);
}
