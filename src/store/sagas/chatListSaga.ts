import { AxiosResponse } from 'axios';
import { chatsActions } from 'features/chat-list';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import { call, CallEffect, put, PutEffect, take, TakeEffect } from 'redux-saga/effects';
import { getChatList } from 'services/apiService';
import { authenticationActions } from 'store/slices/authentication';
import { IChat } from 'types';

export function* chatListSaga(): Generator<
  TakeEffect | CallEffect | PutEffect,
  void,
  AxiosResponse<Array<IChat>>
> {
  while (true) {
    try {
      yield take([chatAreaActions.newMessage.type, authenticationActions.loginUser.type]);
      const res = yield call(getChatList);
      console.log(res.data);

      yield put(chatsActions.setChats(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}
