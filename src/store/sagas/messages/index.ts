import { all } from 'redux-saga/effects';
import { newChatCreated } from '../chats/newChatCreated';
import { messageFromNewContact } from './messageFromNewContact';
import { newMessageWatcher } from './newMessageSaga';

export function* messagesFlow() {
  yield all([newMessageWatcher(), newChatCreated(), messageFromNewContact()]);
}
