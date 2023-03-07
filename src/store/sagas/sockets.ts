import { chatAreaActions } from 'features/chat/redux/chatArea';
import { EventChannel, eventChannel } from 'redux-saga';
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
import { snackbarActions } from 'store/slices/snackbar';
import { usersStatusesActions } from 'store/slices/usersStatuses';
import { IMessage, OnlineUsers, TypingStatusObject } from 'types';

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
    const resieveMessage = (message: IMessage) => {
      emit({ type: 'newMessage', payload: message });
    };

    const onlineUsers = (data: OnlineUsers) => {
      emit(usersStatusesActions.updateOnline(data));
    };

    const typing = ({ status, userId }: TypingStatusObject) => {
      emit(chatAreaActions.setTyping({ status, userId }));
    };

    const reconnect = (attempt: number) => {
      emit({
        type: snackbarActions.enqueueSnackbar.type,
        payload: {
          message: `Reconnected on attempt: ${attempt}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success'
          },
          dismissed: false
        }
      });
    };

    const reconnectError = (error: Error) => {
      emit({
        type: snackbarActions.enqueueSnackbar.type,
        payload: {
          message: `Reconnection error: ${error}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning'
          },
          dismissed: false
        }
      });
    };

    const reconnectFailed = () => {
      emit({
        type: snackbarActions.enqueueSnackbar.type,
        payload: {
          message: `We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error'
          },
          dismissed: false
        }
      });
    };

    socket.on('recMsg', resieveMessage);
    socket.on('onlineUsers', onlineUsers);
    socket.on('typing', typing);
    socket.io.on('reconnect', reconnect);
    socket.io.on('reconnect_error', reconnectError);
    socket.io.on('reconnect_failed', reconnectFailed);

    return () => {
      socket.off('recMsg', resieveMessage);
      socket.off('onlineUsers', onlineUsers);
      socket.off('typing', typing);
      socket.io.off('reconnect', reconnect);
      socket.io.off('reconnect_error', reconnectError);
      socket.io.off('reconnect_failed', reconnectFailed);
    };
  });
}

function* runChanel(
  socket: Socket
): Generator<
  CallEffect | TakeEffect | PutEffect,
  void,
  EventChannel<{ type: string; payload: any }> & any
> {
  const channel = yield call(runSagaChanel, socket);

  try {
    while (true) {
      // eslint-disable-next-line prefer-const
      let action = yield take(channel);
      yield put(action);
    }
  } finally {
    channel.close();
    socket.disconnect();
  }
}

function* sendMessage(socket: Socket) {
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
  yield fork(sendMessage, socket);
  yield fork(typing, socket);
}

export function* IOSaga(): Generator<TakeEffect | CallEffect | ForkEffect, void, Socket> {
  try {
    yield take('CHANEL_ON');
    const socket = yield call(connect);
    yield fork(runChanel, socket);
    yield fork(runSocketEmmiters, socket);
  } catch (error) {
    console.log(error);
  }
}
