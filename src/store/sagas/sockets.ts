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
import { messagesActions } from 'features/chat';
import { connectToNewChat } from './chats/connectToNewChatSaga';
import { sendMessage } from './messages/sendMessage';
import { typingSaga } from './messages/typingSaga';
import { editMessageSaga } from './messages/editMessageSaga';
import { addReaction } from './messages/addReaction';
import { deleteReaction } from './messages/deleteReaction';

let socket;

function* connect(): Generator<SelectEffect, Socket, string> {
  const userId = yield select((state: RootState) => state.authentication.user?._id);
  console.log(userId);

  socket = io(serverLink, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    query: {
      id: userId
    }
  });

  return socket;
}

function socketChanel(socket: Socket) {
  return eventChannel((emit) => {
    const resieveMessage = (message: IMessage) => {
      emit({ type: 'newMessage', payload: message });
    };

    const messageFromNewContact = (data: any) => {
      emit({ type: 'MESSAGE_FROM_NEW_CONTACT', payload: data });
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
    const messagesDeleted = ({ chatId, messagesIds }: any) => {
      emit(messagesActions.deleteMessages({ chatId, messagesIds }));
    };
    const messageEdited = ({ message }: any) => {
      emit(messagesActions.editMessage(message));
    };
    const reactionAdded = ({ chatId, messageId, reactions }: any) => {
      emit(messagesActions.addReaction({ chatId, messageId, reactions }));
    };
    const reactionDeleted = ({ chatId, messageId, reactionId }: any) => {
      console.log('get response');
      emit(messagesActions.deleteReaction({ chatId, messageId, reactionId }));
    };

    socket.on(events.RESPONSE_MESSAGE, resieveMessage);
    socket.on(events.MESSAGE_FROM_NEW_CONTACT, messageFromNewContact);
    socket.on(events.NEW_CHAT_CREATED, newChatCreated);
    socket.on(events.ONLINE_USERS, online);
    socket.on(events.TYPING_ON, typing);
    socket.on('messageDeleted', messagesDeleted);
    socket.on('messageEdited', messageEdited);
    socket.on('reactionAdded', reactionAdded);
    socket.on('reactionDeleted', reactionDeleted);

    return () => {
      socket.off(events.RESPONSE_MESSAGE, resieveMessage);
      socket.off(events.MESSAGE_FROM_NEW_CONTACT, online);
      socket.off(events.TYPING_ON, typing);
      socket.off(events.MESSAGE_FROM_NEW_CONTACT, messageFromNewContact);
      socket.off(events.NEW_CHAT_CREATED, newChatCreated);
      socket.off('messageDeleted', messagesDeleted);
      socket.off('messageEdited', messageEdited);
      socket.off('reactionAdded', reactionAdded);
      socket.off('reactionDeleted', reactionDeleted);
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
}

export function* socketSaga(): Generator<TakeEffect | CallEffect | ForkEffect, void, Socket> {
  try {
    yield take('CHANEL_ON');
    const socket = yield call(connect);
    yield fork(runChanel, socket);
    yield fork(runSocketEmmiters, socket);
  } catch (error) {
    console.log(error);
  }
}
