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
    };
  };
}

const initialState = {
  byChatId: {
    '111': {
      byId: arrayToObject(mockMessage, 'id'),
      messagesIds: arrayOfIds(mockMessage, 'id')
    }
  }
} as IInitialState;

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ chatId: string; messages: IMessage[] }>) => {
      const { chatId, messages } = action.payload;
      state.byChatId[chatId].byId = arrayToObject(messages, 'id');
      state.byChatId[chatId].messagesIds = arrayOfIds(messages, 'id');
    },
    addNewMessage: (state, action: PayloadAction<IMessage>) => {
      const { chatId, id } = action.payload;
      state.byChatId[chatId].byId[id] = action.payload;
      state.byChatId[chatId].messagesIds.push(id);
    },
    deleteMessage: (state, action: PayloadAction<{ chatId: string; msgId: string }>) => {
      const { chatId, msgId } = action.payload;
      console.log(chatId, msgId);

      delete state.byChatId[chatId].byId[msgId];
      state.byChatId[chatId].messagesIds = state.byChatId[chatId].messagesIds.filter(
        (id) => id !== msgId
      );
    }
  }
});

export const messagesActions = messages.actions;
export const messagesReducer = messages.reducer;
