import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { chatsActions } from 'features/chat-list';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import {
  call,
  CallEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect
} from 'redux-saga/effects';
import { getChatMessages } from 'services/apiService';
import { RootState } from 'store';
// import { IChat, MessageShort } from 'types';

export function* chatMessagesSaga(): Generator<
  TakeEffect | CallEffect | PutEffect | SelectEffect,
  void,
  PayloadAction<{ id: string; fullName: string }> & any
> {
  while (true) {
    try {
      const action = yield take(chatsActions.setActiveUser.type);
      const chatId = yield select(
        (state: RootState) =>
          state.chats.chats.find((chat) => chat.partnerId === action.payload.id)?.chatId
      );
      const res = yield call(getChatMessages, chatId);
      console.log(res);

      yield put(chatAreaActions.setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}
