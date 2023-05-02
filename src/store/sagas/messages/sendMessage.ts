/* eslint-disable prefer-const */
import { call, delay, fork, put, race, take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { REQUEST_MESSAGE } from 'consts/events';
import { messagesActions } from 'blocks/chat';
import { sentMessagesQueueActions } from 'store/slices/sentMessagesQueue';
import { IMessage } from 'types';
import { newMessageSaga } from './newMessageSaga';

export function* sendMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take('sendMessage');
    let dummyId = Math.floor(Math.random() * 1000);
    // add to all messages with dummy id and other data which we expect from server and mark it as "sended"
    // if we have a photos here, we add to message URL.createObjectUrl
    //send it to cloudinary and wait until it uploaded
    //if error while uploading photo, show error indicator on each photo
    //shows upload indicator for each photo
    // add links to message
    //send message to the server via sockets
    // wait result in recieveMessageSaga, change recieved message with created and mark it as delivered
    const message = {
      _id: String(dummyId),
      createdAt: new Date().toISOString(),
      ...payload
    };
    yield put(messagesActions.addToQueue(message));
    yield fork(sendMessageFromQueue, socket, message);
  }
}

export function* sendMessageFromQueue(socket: Socket, message: any): any {
  socket.emit(REQUEST_MESSAGE, message);
  console.log(message);

  const { _id } = message;
  const { newMessage, timeout } = yield race({
    newMessage: take('newMessage'),
    timeout: delay(10000)
  });
  console.log(newMessage);

  if (timeout) {
    yield put(messagesActions.sendingErrorMessage({ chatId: message.chatId, dummyId: _id }));
  } else {
    yield fork(newMessageSaga, newMessage.payload, _id);
  }
}
