import { call, put, take } from 'redux-saga/effects';
import { getChatSaga } from '../chats/getChatSaga';
import { getMessagesSaga } from './chatMessagesSaga';

export function* messageFromNewContact(): any {
  while (true) {
    try {
      const { payload } = yield take('MESSAGE_FROM_NEW_CONTACT');
      console.log('inside saga message from new contact', payload);

      yield call(getChatSaga, payload);
      yield call(getMessagesSaga, payload);
      yield put({ type: 'CONNECT_TO_NEW_CHAT', payload: payload });
    } catch (error) {
      console.log(error);
    }
  }
}
