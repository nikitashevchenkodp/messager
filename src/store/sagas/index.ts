/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit';
import { chatsActions } from 'features/chat-list';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import { stat } from 'fs';
import { eventChannel } from 'redux-saga';
import { all, call, delay, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { getChatList, getChatMessages, ILogin, login } from 'services/apiService';
import { io } from 'socket.io-client';
import { RootState } from 'store';
import { authenticationActions } from 'store/slices/authentication';
import { addNewMessage, runIo } from './socketChanel';

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
      yield take();
      const res = yield call(getChatList);
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
      const res = yield call(getChatMessages, payload.id);
      yield put(chatAreaActions.setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

export function* rootSaga() {
  yield all([loginSaga(), runIo(), chatListSaga(), chatMessagesSaga(), addNewMessage()]);
}
