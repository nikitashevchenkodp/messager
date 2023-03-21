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
  any,
  AxiosResponse<Array<IChat>>
> {
  try {
    const res = yield call(getChatList);
    yield put(chatsActions.setChats(res.data));
    return res;
  } catch (error) {
    console.log(error);
  }
}
