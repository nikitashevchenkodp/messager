import { EDIT_MESSAGE } from 'consts/events';
import { messagesActions } from 'blocks/chat';
import { take } from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

export function* editMessageSaga(socket: Socket): any {
  while (true) {
    const { payload } = yield take('editMessage');
    console.log('edit message saga');

    socket.emit(EDIT_MESSAGE, { messageId: payload.messageId, text: payload.text });
  }
}
