/* eslint-disable prefer-const */
import { take } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { REQUEST_MESSAGE } from 'consts/events';

export function* sendMessage(socket: Socket) {
  while (true) {
    const { payload } = yield take('sendMessage');
    // add to all messages with dummy id and other data which we expect from server and mark it as "sended"
    // if we have a photos here, we add to message URL.createObjectUrl
    //send it to cloudinary and wait until it uploaded
    //if error while uploading photo, show error indicator on each photo
    //shows upload indicator for each photo
    // add links to message
    //send message to the server via sockets
    // wait result in recieveMessageSaga, change recieved message with created and mark it as delivered

    socket.emit(REQUEST_MESSAGE, payload);
  }
}
