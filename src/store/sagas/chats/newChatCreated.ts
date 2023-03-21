import { PayloadAction } from '@reduxjs/toolkit';
import { call, CallEffect, PutEffect, SelectEffect, take, TakeEffect } from 'redux-saga/effects';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { IMessage } from 'types';
import { getMessagesSaga } from '../messages/chatMessagesSaga';
import { getChatSaga } from './getChatSaga';

export function* newChatCreated(): Generator<
  TakeEffect | SelectEffect | PutEffect | CallEffect,
  void,
  PayloadAction<IMessage> & string & any
> {
  while (true) {
    const { payload } = yield take(activeEntitiesActions.newChatCreated.type);
    yield call(getChatSaga, payload);
    yield call(getMessagesSaga, payload);
  }
}
