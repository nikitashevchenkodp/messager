import { messagesActions } from 'blocks/chat';
import { take } from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

export function* deleteMessageSaga(socket: Socket): any {
  while (true) {
    const { payload } = yield take(messagesActions.startDeleteMessages.type);
    socket.emit('deleteMessage', { ...payload });
  }
}
