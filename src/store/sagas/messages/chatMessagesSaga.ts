import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { messagesActions } from 'blocks/chat';
import { chatsActions } from 'blocks/center/chat-list';
import {
  call,
  CallEffect,
  fork,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect
} from 'redux-saga/effects';
import { getChatMessages } from 'services/apiService';

export function* getMessagesSaga(chatId: string): any {
  try {
    const res = yield call(getChatMessages, chatId);
    yield put(messagesActions.setChat({ chatId, messages: res.data }));
  } catch (error) {
    console.log(error);
  }
}

export function* loadMessagesSaga(
  chatList: any
): Generator<
  TakeEffect | CallEffect | PutEffect | SelectEffect | ForkEffect,
  void,
  PayloadAction<{ id: string; fullName: string }> & any
> {
  try {
    for (let i = 0; i < chatList.length; i++) {
      yield fork(getMessagesSaga, chatList[i].chatId);
    }
  } catch (error) {
    console.log(error);
  }
}
