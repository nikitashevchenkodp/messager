import { PayloadAction } from '@reduxjs/toolkit';
import { messagesActions } from 'blocks/chat';
import {
  call,
  put,
  PutEffect,
  select,
  SelectEffect,
  take,
  TakeEffect,
  takeEvery
} from 'redux-saga/effects';
import { RootState } from 'store';
import { snackbarActions } from 'store/slices/snackbar';
import { IMessage } from 'types';
import notificationSound from 'assets/mixkit-correct-answer-tone-2870.wav';
import { getChatSaga } from '../chats/getChatSaga';
import { getMessagesSaga } from './chatMessagesSaga';
import { getCurrentUserId } from 'store/selectors';

// Generator<
//   TakeEffect | SelectEffect | PutEffect,
//   void,
//   PayloadAction<IMessage> & string
// >

export function* newMessage(message: any, dummyMessageId?: string): any {
  console.log('inside new message saga');
  const currentUserId = yield select(getCurrentUserId);
  const activeChatId = yield select((state: RootState) => state.entities.active.activeChat.id);
  if (activeChatId !== message.chatId) {
    const audio = new Audio(notificationSound);
    // audio.play();
  }
  const chat = yield select((state: RootState) => state.entities.messages.byChatId[message.chatId]);
  console.log(chat);

  if (!chat) {
    console.log('no chat');

    yield call(getChatSaga, message.chatId);
    yield call(getMessagesSaga, message.chatId);
    return;
  }
  if (currentUserId === message.from) {
    yield put(
      messagesActions.removeFromQueueById({ chatId: message.chatId, messageId: dummyMessageId })
    );
  }
  yield put(messagesActions.newMessage(message));
  // yield put(
  //   snackbarActions.enqueueSnackbar({
  //     message: 'You recieved a new message',
  //     options: {
  //       key: new Date().getTime() + Math.random(),
  //       variant: 'success'
  //     },
  //     dismissed: false
  //   })
  // );
}

// export function* newMessageWatcher() {
//   yield takeEvery('newMessage', newMessage);
// }
