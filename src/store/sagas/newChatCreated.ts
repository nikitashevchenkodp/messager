import { PayloadAction } from '@reduxjs/toolkit';
import { chatActions } from 'features/chat';
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
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { IMessage } from 'types';
import { getChatListSaga } from './chatListSaga';
import { getMessagesSaga } from './chatMessagesSaga';

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
