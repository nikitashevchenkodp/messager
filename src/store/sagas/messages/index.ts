import { all } from 'redux-saga/effects';
import { newChatCreated } from '../chats/newChatCreated';
import { messageFromNewContact } from './messageFromNewContact';
import { sendMessage } from './sendMessage';

export function* messagesFlow() {
  yield all([newChatCreated(), messageFromNewContact()]);
}
