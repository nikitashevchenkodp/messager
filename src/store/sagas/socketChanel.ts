/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import { chatAreaActions } from 'features/chat/redux/chatArea';
import { END, eventChannel } from 'redux-saga';
import {
  call,
  CallEffect,
  fork,
  ForkEffect,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect
} from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { RootState } from 'store';

let socket;

function* connect(): Generator<SelectEffect, Socket, string> {
  const userId = yield select((state: RootState) => state.authentication.user._id);
  socket = io('http://localhost:5002', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    query: {
      id: userId
    }
  });
  return socket;
}

function runSagaChanel(socket: Socket) {
  return eventChannel((emit) => {
    socket.on('recMsg', (message: any) => {
      emit({ type: 'newMessage', payload: message });
    });

    socket.on('typing', ({ status, userId }: any) => {
      emit(chatAreaActions.setTyping({ status, userId }));
    });
    socket.io.on('reconnect', (attempt: any) => {
      console.info('Reconnected on attempt: ' + attempt);
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

function* runChanel(socket: Socket): Generator<CallEffect | TakeEffect | PutEffect, void, any> {
  const channel = yield call(runSagaChanel, socket);
  try {
    while (true) {
      let action = yield take(channel);
      yield put(action);
    }
  } finally {
    channel.close();
    socket.disconnect();
  }
}

function* write(socket: Socket) {
  while (true) {
    const { payload } = yield take('sendMessage');
    socket.emit('sendMessage', payload);
  }
}

function* typing(socket: Socket): Generator<TakeEffect | SelectEffect, void, { payload: string }> {
  while (true) {
    const { payload } = yield take(chatAreaActions.typing.type);
    const userId = yield select((state: RootState) => state.authentication.user._id);
    const chatId = yield select((state: RootState) => state.chats.activeChat?.chatId);
    socket.emit('typing', { status: payload, userId, chatId });
  }
}

function* runSocketEmmiters(socket: Socket) {
  yield fork(write, socket);
  yield fork(typing, socket);
}

export function* runIo(): Generator<TakeEffect | CallEffect | ForkEffect, void, any> {
  try {
    yield take('CHANEL_ON');
    const socket = yield call(connect);
    yield fork(runChanel, socket);
    yield fork(runSocketEmmiters, socket);
  } catch (error) {
    console.log(error);
  }
}
