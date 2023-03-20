import { messagesActions } from 'features/chat';
import { take } from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

export function* deleteMessageSaga(socket: Socket): any {
  while (true) {
    const { payload } = yield take(messagesActions.startDeleteMessage.type);
    socket.emit('deleteMessage', { message: payload });
  }
}
