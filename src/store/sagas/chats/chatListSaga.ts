/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios';
import { ChildProcess } from 'child_process';
import { messagesActions } from 'features/chat/redux/chat';
import { chatsActions } from 'features/chat-list';
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
    yield take([authenticationActions.loginUser.type, 'GET_CHATLIST']);
    yield call(getChatListSaga);
  }
}
