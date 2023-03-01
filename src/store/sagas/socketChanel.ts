/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import { chatAreaActions } from 'features/chat/redux/chatArea';
import { eventChannel } from 'redux-saga';
import { call, fork, put, select, take } from 'redux-saga/effects';
import { io } from 'socket.io-client';
import { RootState } from 'store';

function connect() {
  const socket = io('http://localhost:5002', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
  });
  console.log('run connect');
  socket.connect();
  return socket;
}

function subscribe(socket: any) {
  return eventChannel((emit) => {
    socket.on('recMsg', (message: any) => {
      emit({ type: 'newMessage', payload: message });
    });

    socket.on('typing', ({ status, userId }: any) => {
      emit(chatAreaActions.setTyping({ status, userId }));
    });
    socket.io.on('reconnect', (attempt: any) => {
      console.info('Reconnected on attempt: ' + attempt);
      emit({ type: 'CHANEL_ON' });
    });

    socket.io.on('reconnect_attempt', (attempt: any) => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', (error: any) => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      alert(
        'We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.'
      );
    });

    return () => {};
  });
}

function* read(socket: any): any {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket: any): any {
  while (true) {
    const { payload } = yield take('sendMessage');
    socket.emit('sendMessage', payload);
  }
}

export function* addNewMessage(): any {
  while (true) {
    const message = yield take('newMessage');
    console.log('addMessage', message);

    const currentChatId = yield select((state: RootState) => state.chats.activeChat?.id);

    if (message.payload.chatId === currentChatId) {
      console.log('here');

      yield put(chatAreaActions.newMessage(message.payload));
    }
  }
}

function* typing(socket: any): any {
  while (true) {
    const { payload } = yield take(chatAreaActions.typing.type);
    const userId = yield select((state: RootState) => state.authentication.user._id);
    const chatId = yield select((state: RootState) => state.chats.activeChat?.id);
    socket.emit('typing', { status: payload, userId, chatId });
  }
}

function* handleIO(socket: any) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(typing, socket);
}

export function* runIo(): any {
  //   while (true) {
  yield take('CHANEL_ON');
  const socket = yield call(connect);
  const chats = yield select((state: RootState) => state.chats.chats);
  const userId = yield select((state: RootState) => state.authentication.user._id);
  socket.emit('join', { chats, id: userId });
  console.log(socket);
  yield fork(handleIO, socket);
  //   }
}
