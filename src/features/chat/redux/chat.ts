/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'types';

interface UIInitState {
  byChatId: {
    [id: string]: {
      chatId: string;
      messages: IMessage[];
      editableMessage: IMessage | null;
    };
  };
}

const initialState: UIInitState = {
  byChatId: {}
};

export const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<{ chatId: string; messages: any[] }>) => {
      const { chatId, messages } = action.payload;
      state.byChatId[action.payload.chatId] = {
        chatId,
        messages,
        editableMessage: null
      };
    },
    newMessage: (state, action: PayloadAction<any>) => {
      const chatId = action.payload.chatId;
      state.byChatId[chatId].messages.push(action.payload);
    },
    startDeleteMessage: (state, action: PayloadAction<IMessage>) => {},
    deleteMessage: (state, action: PayloadAction<{ chatId: string; messageId: string }>) => {
      const { chatId, messageId } = action.payload;
      state.byChatId[chatId].messages = state.byChatId[chatId].messages.filter(
        (msg) => msg._id !== messageId
      );
    },
    editMessage: (state, action: PayloadAction<IMessage>) => {
      console.log('edited message in slice');

      const { chatId, _id } = action.payload;
      state.byChatId[chatId].messages = state.byChatId[chatId].messages.map((msg) => {
        if (msg._id === _id) {
          return action.payload;
        }
        return msg;
      });
    },
    setEditableMessage: (state, action: PayloadAction<{ chatId: string; messageId?: string }>) => {
      const { chatId, messageId } = action.payload;
      if (!messageId) {
        state.byChatId[chatId].editableMessage = null;
      } else {
        state.byChatId[chatId].editableMessage =
          state.byChatId[chatId].messages.find((message) => message._id === messageId) || null;
      }
    }
  }
});

export const messagesReducer = messages.reducer;
export const messagesActions = messages.actions;
