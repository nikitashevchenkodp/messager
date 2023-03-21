import { TYPING_EMIT } from 'consts/events';
import { select, SelectEffect, take, TakeEffect } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { RootState } from 'store';

export function* typingSaga(socket: Socket): Generator<TakeEffect | SelectEffect, void, any> {
  while (true) {
    const { payload } = yield take('typing');
    const chatId = yield select((state: RootState) => state.entities.active.activeChat?.chatId);
    socket.emit(TYPING_EMIT, { ...payload, chatId });
  }
}
