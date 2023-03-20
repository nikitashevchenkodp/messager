import { PayloadAction } from '@reduxjs/toolkit';
import { call, CallEffect, PutEffect, SelectEffect, take, TakeEffect } from 'redux-saga/effects';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { IMessage } from 'types';
import { getChatListSaga } from './chatListSaga';
import { getMessagesSaga } from '../messages/chatMessagesSaga';

export function* newChatCreated(): Generator<
  TakeEffect | SelectEffect | PutEffect | CallEffect,
  void,
  PayloadAction<IMessage> & string & any
> {
  while (true) {
    const action = yield take(activeEntitiesActions.newChatCreated.type);
    yield call(getChatListSaga);
    yield call(getMessagesSaga, action.payload);
  }
}
