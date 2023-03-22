import { DELETE_REACTION } from 'consts/events';
import { take } from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

export function* deleteReaction(socket: Socket): any {
  while (true) {
    const { payload } = yield take('deleteReaction');
    console.log('delete saga');
    socket.emit(DELETE_REACTION, { ...payload });
  }
}
