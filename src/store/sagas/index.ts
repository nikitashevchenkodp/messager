/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { chatsActions } from 'features/chat-list';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import { all, call, put, select, take } from 'redux-saga/effects';
import { getChatList, getChatMessages, login } from 'services/apiService';
import { RootState } from 'store';

import { authenticationActions } from 'store/slices/authentication';
import { runIo } from './socketChanel';

export function* loginSaga(): Generator<any, any, any> {
  try {
    const { payload } = yield take(authenticationActions.loginStart.type);
    const res = yield call(login, payload);
    yield put(authenticationActions.loginUser(res.data));
  } catch (error) {
    console.log(error);
  }
}

export function* chatListSaga(): Generator<any, any, any> {
  while (true) {
    try {
      yield take([chatAreaActions.newMessage.type, authenticationActions.loginUser.type]);
      const res = yield call(getChatList);
      console.log(res.data);

      yield put(chatsActions.setChats(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

export function* chatMessagesSaga(): Generator<any, any, any> {
  while (true) {
    try {
      const { payload } = yield take(chatsActions.setActiveChat.type);
      const res = yield call(getChatMessages, payload.chatId);
      yield put(chatAreaActions.setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

function* addNewMessage(): any {
  while (true) {
    const message = yield take('newMessage');
    console.log('addMessage', message);

    const currentChatId = yield select((state: RootState) => state.chats.activeChat?.chatId);

    if (message.payload.chatId === currentChatId) {
      console.log('here');
      yield put(chatAreaActions.newMessage(message.payload));
    }
  }
}

export function* rootSaga() {
  yield all([loginSaga(), runIo(), chatListSaga(), chatMessagesSaga(), addNewMessage()]);
}
