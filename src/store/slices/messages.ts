import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'store/interfaces';
import { arrayOfIds, arrayToObject } from 'utils/arrToObj';
import { messages as mockMessage } from 'utils/mock/Messages';
interface IInitialState {
  byChatId: {
    [id: string]: {
      byId: {
        [id: string]: IMessage;
      };
      messagesIds: string[];
      scrollOffset: number;
      selectedMessages: Record<string, string>;
    };
  };
}

const initialState = {
  byChatId: {}
} as IInitialState;

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ chatId: string; messages: IMessage[] }>) => {
      const { chatId, messages } = action.payload;

      state.byChatId[chatId] = {
        byId: arrayToObject(messages, 'id'),
        messagesIds: arrayOfIds(messages, 'id'),
        scrollOffset: 0,
        selectedMessages: {}
      };
    },
    addNewMessage: (state, action: PayloadAction<IMessage>) => {
      const { chatId, id } = action.payload;
      if (!state.byChatId[chatId]) {
        state.byChatId[chatId] = {
          byId: {
            [id]: action.payload
          },
          messagesIds: [id],
          scrollOffset: 0,
          selectedMessages: {}
        };
        return;
      }
      state.byChatId[chatId].byId[id] = action.payload;
      state.byChatId[chatId].messagesIds.push(id);
    },
    deleteMessage: (state, action: PayloadAction<{ chatId: string; msgId: string }>) => {
      const { chatId, msgId } = action.payload;
      delete state.byChatId[chatId].byId[msgId];
      state.byChatId[chatId].messagesIds = state.byChatId[chatId].messagesIds.filter(
        (id) => id !== msgId
      );
    },
    editMessage: (state, action: PayloadAction<IMessage>) => {
      console.log('message edited');
    },
    setScrollOffset: (state, action: PayloadAction<{ chatId: string; offset: number }>) => {
      const { chatId, offset } = action.payload;
      state.byChatId[chatId].scrollOffset = offset;
    },
    toggleSelectMessage: (state, action: PayloadAction<{ chatId: string; msgId: string }>) => {
      const { chatId, msgId } = action.payload;
      if (state.byChatId[chatId].selectedMessages[msgId]) {
        delete state.byChatId[chatId].selectedMessages[msgId];
      } else {
        state.byChatId[chatId].selectedMessages[msgId] = msgId;
      }
    },
    clearAllSelectedMessages: (state, action: PayloadAction<string>) => {
      state.byChatId[action.payload].selectedMessages = {};
    },
    deleteMessages: (state, action: PayloadAction<{ chatId: string; messagesIds: string[] }>) => {
      const { messagesIds, chatId } = action.payload;
      console.log(messagesIds);

      messagesIds.forEach((msgId) => {
        delete state.byChatId[chatId].byId[msgId];
        state.byChatId[chatId].messagesIds = state.byChatId[chatId].messagesIds.filter(
          (id) => id !== msgId
        );
      });
    },
    readMessages: (state, action: PayloadAction<{ chatId: string }>) => {
      const { chatId } = action.payload;
      state.byChatId[chatId].messagesIds.forEach((msgId) => {
        state.byChatId[chatId].byId[msgId].readed = true;
      });
    },
    updateMessageStatus: (
      state,
      action: PayloadAction<{
        chatId: string;
        msgId: string;
        status: 'pending' | 'delivered' | 'hasRead' | 'error';
      }>
    ) => {
      const { chatId, msgId, status } = action.payload;
      state.byChatId[chatId].byId[msgId].status = status;
    }
  }
});

export const messagesActions = messages.actions;
export const messagesReducer = messages.reducer;
