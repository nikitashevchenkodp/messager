import { ADD_REACTION } from 'consts/events';
import { take } from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

export function* addReaction(socket: Socket): any {
  while (true) {
    const { payload } = yield take('addReaction');
    socket.emit(ADD_REACTION, { ...payload });
  }
}
