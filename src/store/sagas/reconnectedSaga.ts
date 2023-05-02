/* eslint-disable prefer-const */
import { call, delay, fork, select, take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { RootState } from 'store';
import { sendMessageFromQueue } from './messages/sendMessage';

export function* reconnectedSaga(socket: Socket): any {
  while (true) {
    yield take('reconnected');
    yield delay(2000);
    console.log('awaited socket open');

    const allMessagesByChatId: RootState['entities']['messages']['byChatId'] = yield select(
      (state: RootState) => state.entities.messages.byChatId
    );
    const allMessages = Object.values(allMessagesByChatId);
    for (let messages of allMessages) {
      const messagesIdsInQueue = messages.sentQueue.messagesIds;
      if (messagesIdsInQueue.length) {
        for (let msgId of messagesIdsInQueue) {
          const msgInQueue = messages.sentQueue.messagesById[msgId];
          yield call(sendMessageFromQueue, socket, msgInQueue);
        }
      }
    }
  }
}
