import { all } from 'redux-saga/effects';
import { newChatCreated } from '../chats/newChatCreated';
import { messageFromNewContact } from './messageFromNewContact';
import { newMessage } from './newMessageSaga';

export function* messagesFlow() {
  yield all([newMessage(), newChatCreated(), messageFromNewContact()]);
}
