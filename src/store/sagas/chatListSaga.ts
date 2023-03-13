/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios';
import { ChildProcess } from 'child_process';
import { chatsActions } from 'features/chat-list';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { getChatList } from 'services/apiService';
import { authenticationActions } from 'store/slices/authentication';
import { IChat } from 'types';

export function* getChatListSaga(): Generator<
  TakeEffect | CallEffect | PutEffect | ChildProcess,
  void,
  AxiosResponse<Array<IChat>>
> {
  try {
    const res = yield call(getChatList);
    console.log(res);

    yield put(chatsActions.setChats(res.data));
  } catch (error) {
    console.log(error);
  }
}

export function* chatListSaga(): Generator<
  TakeEffect | CallEffect | PutEffect,
  void,
  AxiosResponse<Array<IChat>>
> {
  while (true) {
    yield take([
      chatAreaActions.newMessage.type,
      authenticationActions.loginUser.type,
      'GET_CHATLIST'
    ]);
    yield call(getChatListSaga);
  }
}
