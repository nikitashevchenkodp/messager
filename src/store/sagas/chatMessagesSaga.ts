import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { chatsActions } from 'features/chat-list';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { getChatMessages } from 'services/apiService';
import { IChat, MessageShort } from 'types';

export function* chatMessagesSaga(): Generator<
  TakeEffect | CallEffect | PutEffect,
  void,
  PayloadAction<IChat> & AxiosResponse<Array<MessageShort>>
> {
  while (true) {
    try {
      const action = yield take(chatsActions.setActiveChat.type);
      const res = yield call(getChatMessages, action.payload.chatId);
      yield put(chatAreaActions.setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}
