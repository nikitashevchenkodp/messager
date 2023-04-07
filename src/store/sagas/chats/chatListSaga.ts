/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios';
import { ChildProcess } from 'child_process';
import { messagesActions } from 'blocks/chat/redux/chat';
import { chatsActions } from 'blocks/chat-list';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { getChatList } from 'services/apiService';
import { IChat } from 'types';

export function* getChatListSaga(): Generator<
  TakeEffect | CallEffect | PutEffect | ChildProcess,
  any,
  AxiosResponse<Array<IChat>>
> {
  try {
    yield put(chatsActions.setIsLoading(true));
    const res = yield call(getChatList);
    yield put(chatsActions.setChats(res.data));
    yield put(chatsActions.setIsLoading(false));
    return res;
  } catch (error) {
    console.log(error);
  }
}
