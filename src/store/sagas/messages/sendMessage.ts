import { take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { REQUEST_MESSAGE } from 'consts/events';

export function* sendMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take('sendMessage');
    socket.emit(REQUEST_MESSAGE, payload);
  }
}
