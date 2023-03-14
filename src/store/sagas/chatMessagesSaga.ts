import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { chatActions } from 'features/chat';
import { chatListActions } from 'features/chat-list';
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
import { RootState } from 'store';
import { activeEntitiesActions } from 'store/slices/activeEntities';

export function* getMessagesSaga(chatId: string): any {
  try {
    const res = yield call(getChatMessages, chatId);
    console.log(res.data);
    yield put(chatActions.setMessages({ chatId, items: res.data }));
  } catch (error) {
    console.log(error);
  }
}

export function* loadMessagesSaga(): Generator<
  TakeEffect | CallEffect | PutEffect | SelectEffect | ForkEffect,
  void,
  PayloadAction<{ id: string; fullName: string }> & any
> {
  try {
    const action = yield take(chatListActions.setChats.type);
    const chatList = action.payload;
    for (let i = 0; i < chatList.length; i++) {
      yield fork(getMessagesSaga, chatList[i].chatId);
    }

    // const chatId = yield select((state: RootState) => state.entities.active.activeChat?.chatId);
    // if (!chatId) {
    //   yield put(chatActions.setMessages([]));
    // } else {
    //   const res = yield call(getChatMessages, chatId);
    //   yield put(chatActions.setMessages(res.data));
    // }
  } catch (error) {
    console.log(error);
  }
}
