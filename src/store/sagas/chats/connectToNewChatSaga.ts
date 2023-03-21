import { take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';

export function* connectToNewChat(socket: Socket) {
  while (true) {
    const { payload } = yield take('CONNECT_TO_NEW_CHAT');
    socket.emit('connectToNewChat', payload);
  }
}
