import { PayloadAction } from '@reduxjs/toolkit';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import { put, PutEffect, select, SelectEffect, take, TakeEffect } from 'redux-saga/effects';
import { RootState } from 'store';
import { snackbarActions } from 'store/slices/snackbar';
import { IMessage } from 'types';

export function* newMessage(): Generator<
  TakeEffect | SelectEffect | PutEffect,
  void,
  PayloadAction<IMessage> & string
> {
  while (true) {
    const message = yield take('newMessage');
    console.log('addMessage', message);

    const currentChatId = yield select((state: RootState) => state.chats.activeChat?.chatId);

    if (message.payload.chatId === currentChatId) {
      yield put(chatAreaActions.newMessage(message.payload));
    } else {
      yield put(
        snackbarActions.enqueueSnackbar({
          message: 'You recieved a new message',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success'
          },
          dismissed: false
        })
      );
    }
  }
}
