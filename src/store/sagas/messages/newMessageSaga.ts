import { PayloadAction } from '@reduxjs/toolkit';
import { messagesActions } from 'features/chat';
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
    yield put(messagesActions.newMessage(message.payload));
    // yield put(
    //   snackbarActions.enqueueSnackbar({
    //     message: 'You recieved a new message',
    //     options: {
    //       key: new Date().getTime() + Math.random(),
    //       variant: 'success'
    //     },
    //     dismissed: false
    //   })
    // );
  }
}
