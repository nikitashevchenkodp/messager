import { chatsActions } from 'features/chat';
import { take } from 'redux-saga/effects';

import { Socket } from 'socket.io-client';

// export function* editMessageSaga(socket: Socket): any {
//   while (true) {
//     const { payload } = yield take(chatsActions.);
//     socket.emit('deleteMessage', { id: payload });
//   }
// }
