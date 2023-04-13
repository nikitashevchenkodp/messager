/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AxiosResponse } from 'axios';
import { ChildProcess } from 'child_process';
import { messagesActions } from 'blocks/chat/redux/chat';
import { chatsActions } from 'blocks/center/chat-list';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { getChat, getChatList } from 'services/apiService';
import { authenticationActions } from 'store/slices/authentication';
import { IChat } from 'types';

export function* getChatSaga(
  chatId: string
): Generator<
  TakeEffect | CallEffect | PutEffect | ChildProcess,
  void,
  AxiosResponse<Array<IChat>> & any
> {
  try {
    const newChat = yield call(getChat, chatId);
    yield put(chatsActions.addChat(newChat.data));
  } catch (error) {
    console.log(error);
  }
}
