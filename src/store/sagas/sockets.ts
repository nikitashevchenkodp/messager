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
import { IMessage, TypingStatusObject } from 'types';
import { serverLink } from 'consts/externalLinks';
import { usersActions } from 'store/slices/usersStatuses';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import * as events from 'consts/events';
import { deleteMessageSaga } from './messages/deleteMessage';
import { messagesActions } from 'features/chat';

let socket;

function* connect(): Generator<SelectEffect, Socket, string> {
  const userId = yield select((state: RootState) => state.authentication.user._id);
  socket = io(serverLink, {
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

    const messageFromNewContact = () => {
      emit({ type: 'GET_CHATLIST' });
    };
    const newChatCreated = (chatId: string) => {
      emit({ type: activeEntitiesActions.newChatCreated.type, payload: chatId });
    };

    const online = (data: string[]) => {
      emit(usersActions.updateOnline(data));
    };

    const typing = ({ typing, userId }: TypingStatusObject) => {
      emit(usersActions.setTypingStatus({ userId, typing }));
    };
    const messageDeleted = ({ message }: any) => {
      console.log('message deleted', message._id);
      emit(messagesActions.deleteMessage({ chatId: message.chatId, messageId: message._id }));
    };

    const reconnect = (attempt: number) => {
      emit({ type: 'GET_CHATLIST' });
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

    socket.on(events.RESPONSE_MESSAGE, resieveMessage);
    socket.on(events.MESSAGE_FROM_NEW_CONTACT, messageFromNewContact);
    socket.on(events.NEW_CHAT_CREATED, newChatCreated);
    socket.on(events.ONLINE_USERS, online);
    socket.on(events.TYPING_ON, typing);
    socket.on('messageDeleted', messageDeleted);
    socket.io.on('reconnect', reconnect);
    socket.io.on('reconnect_error', reconnectError);
    socket.io.on('reconnect_failed', reconnectFailed);

    return () => {
      socket.off(events.RESPONSE_MESSAGE, resieveMessage);
      socket.off(events.MESSAGE_FROM_NEW_CONTACT, online);
      socket.off(events.TYPING_ON, typing);
      socket.off(events.MESSAGE_FROM_NEW_CONTACT, messageFromNewContact);
      socket.off(events.NEW_CHAT_CREATED, newChatCreated);
      socket.off('messageDeleted', messageDeleted);

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
    socket.emit(events.REQUEST_MESSAGE, payload);
  }
}

function* typing(socket: Socket): Generator<TakeEffect | SelectEffect, void, any> {
  while (true) {
    const { payload } = yield take('typing');
    const chatId = yield select((state: RootState) => state.entities.active.activeChat?.chatId);
    socket.emit(events.TYPING_EMIT, { ...payload, chatId });
  }
}

function* runSocketEmmiters(socket: Socket) {
  yield fork(sendMessage, socket);
  yield fork(typing, socket);
  yield fork(deleteMessageSaga, socket);
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
