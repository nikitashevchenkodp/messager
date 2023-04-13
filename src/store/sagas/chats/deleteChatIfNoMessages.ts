import { messagesActions } from 'blocks/chat';
import { put, select, take } from 'redux-saga/effects';
import { RootState } from 'store';
import { chatsActions } from 'store/slices/chats';

export function* deleteChatIfNoMessages(): any {
  while (true) {
    const { payload } = yield take(messagesActions.deleteMessages.type);
    const chatId = payload.chatId;
    const messagesLength = yield select(
      (state: RootState) => state.entities.messages.byChatId[chatId].messagesIds.length
    );
    if (messagesLength < 1) {
      yield put(chatsActions.removeChat(chatId));
    }
  }
}
