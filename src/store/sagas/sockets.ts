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
import { IMessage, TypingStatusObject } from 'types';
import { serverLink } from 'consts/externalLinks';
import { usersActions } from 'store/slices/usersStatuses';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import * as events from 'consts/events';
import { deleteMessageSaga } from './messages/deleteMessage';
import { messagesActions } from 'blocks/chat';
import { connectToNewChat } from './chats/connectToNewChatSaga';
import { sendMessage, sendMessageFromQueue } from './messages/sendMessage';
import { typingSaga } from './messages/typingSaga';
import { editMessageSaga } from './messages/editMessageSaga';
import { addReaction } from './messages/addReaction';
import { deleteReaction } from './messages/deleteReaction';
import { id } from 'date-fns/locale';
import { reconnectedSaga } from './reconnectedSaga';

let socket: Socket | undefined;

function* connect(): Generator<SelectEffect, Socket, string> {
  const userId = yield select((state: RootState) => state.authentication.user?._id);

  socket = io(serverLink!, {
    // reconnectionAttempts: 5,
    ackTimeout: 10000,
    reconnectionDelay: 500,
    transports: ['websocket'],
    query: {
      id: userId
    }
  });

  return socket;
}

function* listenDisconnect() {
  while (true) {
    yield take('CHANEL_OFF');
    if (socket) {
      socket.disconnect();
    }
  }
}

function socketChanel(socket: Socket) {
  return eventChannel((emit) => {
    const resieveMessage = (message: IMessage) => {
      console.log(message);

      emit({ type: 'newMessage', payload: message });
    };

    // const messageFromNewContact = (data: any) => {
    //   emit({ type: 'MESSAGE_FROM_NEW_CONTACT', payload: data });
    // };
    // const newChatCreated = (chatId: string) => {
    //   console.log(chatId, 'new chat created');
    //   emit({ type: activeEntitiesActions.newChatCreated.type, payload: chatId });
    // };
    const error = (error: Error) => {
      console.log(error.message);
    };
    const online = (data: string[]) => {
      emit(usersActions.setOnlineList(data));
    };
    const newUserConnected = (data: { userId: string }) => {
      emit(usersActions.addOnlineUser(data.userId));
    };
    const disconnectUser = (data: { userId: string; lastTimeOnline: number }) => {
      emit(usersActions.delOnlineUser(data));
    };

    const typing = ({ typing, userId }: TypingStatusObject) => {
      console.log(typing, userId);

      emit(usersActions.setTypingStatus({ userId, typing }));
    };
    const messagesDeleted = ({ chatId, messagesIds }: any) => {
      emit(messagesActions.deleteMessages({ chatId, messagesIds }));
    };
    const messageEdited = ({ message }: any) => {
      console.log(message, 'edited');

      emit(messagesActions.editMessage(message));
    };
    const reactionAdded = ({ chatId, messageId, reactions }: any) => {
      emit(messagesActions.addReaction({ chatId, messageId, reactions }));
    };
    const reactionDeleted = ({ chatId, messageId, reactionId }: any) => {
      console.log('reaction deleted', chatId, messageId, reactionId);

      emit(messagesActions.deleteReaction({ chatId, messageId, reactionId }));
    };

    const disconnect = () => {
      emit({ type: 'sendingMessageError', payload: 'Error' });
    };
    const reconnectFailed = () => {
      console.log('reconnect failed');
    };
    const reconnected = () => {
      emit({ type: 'reconnected' });
    };
    const open = () => {
      console.log('open socket');
    };

    socket.on(events.RESPONSE_MESSAGE, resieveMessage);
    // socket.on(events.MESSAGE_FROM_NEW_CONTACT, messageFromNewContact);
    // socket.on(events.NEW_CHAT_CREATED, newChatCreated);
    socket.on(events.ONLINE_USERS, online);
    socket.on('USER_DISCONNECTED', disconnectUser);
    socket.on('NEW_USER_CONNECTED', newUserConnected);
    socket.on(events.TYPING_ON, typing);
    socket.on('messageDeleted', messagesDeleted);
    socket.on('messageEdited', messageEdited);
    socket.on('reactionAdded', reactionAdded);
    socket.on('reactionDeleted', reactionDeleted);
    socket.on('error', error);
    socket.on('disconnect', disconnect);
    socket.io.on('reconnect_failed', reconnectFailed);
    socket.io.on('reconnect', reconnected);
    // socket.io.on('open', open);

    return () => {
      socket.off(events.RESPONSE_MESSAGE, resieveMessage);
      socket.off(events.MESSAGE_FROM_NEW_CONTACT, online);
      socket.off(events.TYPING_ON, typing);
      // socket.off(events.MESSAGE_FROM_NEW_CONTACT, messageFromNewContact);
      // socket.off(events.NEW_CHAT_CREATED, newChatCreated);
      socket.off('messageDeleted', messagesDeleted);
      socket.off('messageEdited', messageEdited);
      socket.off('reactionAdded', reactionAdded);
      socket.off('reactionDeleted', reactionDeleted);
      socket.off(events.ONLINE_USERS, online);
      socket.off('USER_DISCONNECTED', disconnectUser);
      socket.off('NEW_USER_CONNECTED', newUserConnected);
      socket.off('error', error);
      socket.off('disconnect', disconnect);
      socket.io.on('reconnect_failed', reconnectFailed);
      socket.io.on('reconnect', reconnected);
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
  const channel = yield call(socketChanel, socket);

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

function* runSocketEmmiters(socket: Socket) {
  yield fork(sendMessage, socket);
  yield fork(editMessageSaga, socket);
  yield fork(addReaction, socket);
  yield fork(deleteReaction, socket);
  yield fork(typingSaga, socket);
  yield fork(deleteMessageSaga, socket);
  yield fork(connectToNewChat, socket);
  yield fork(reconnectedSaga, socket);
}

export function* socketSaga(): Generator<TakeEffect | CallEffect | ForkEffect, void, Socket> {
  while (true) {
    try {
      yield take('CHANEL_ON');
      const socketIO = yield call(connect);
      yield fork(listenDisconnect);
      yield fork(runChanel, socketIO);
      yield fork(runSocketEmmiters, socketIO);
    } catch (error) {
      console.log(error);
    }
  }
}
