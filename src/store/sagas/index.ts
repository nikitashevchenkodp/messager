import { all } from 'redux-saga/effects';
import { chatListSaga } from './chatListSaga';
import { chatMessagesSaga } from './chatMessagesSaga';
import { loginSaga } from './loginSaga';
import { newMessage } from './newMessageSaga';

import { IOSaga } from './sockets';

export function* rootSaga() {
  yield all([loginSaga(), IOSaga(), chatListSaga(), chatMessagesSaga(), newMessage()]);
}
