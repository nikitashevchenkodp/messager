/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'types';

interface UIInitState {
  chatsByIds: {
    [id: string]: {
      chatId: string;
      messages: IMessage[];
      editableMessage: IMessage | null;
    };
  };
}

const initialState: UIInitState = {
  chatsByIds: {}
};

export const chat = createSlice({
  name: 'chatArea',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<{ chatId: string; messages: any[] }>) => {
      const { chatId, messages } = action.payload;
      state.chatsByIds[action.payload.chatId] = {
        chatId,
        messages,
        editableMessage: null
      };
    },
    newMessage: (state, action: PayloadAction<any>) => {
      const chatId = action.payload.chatId;
      state.chatsByIds[chatId].messages.push(action.payload);
    },
    startDeleteMessage: (state, action: PayloadAction<IMessage>) => {},
    deleteMessage: (state, action: PayloadAction<{ chatId: string; messageId: string }>) => {
      const { chatId, messageId } = action.payload;
      console.log(state.chatsByIds[chatId].messages.filter((msg) => msg._id !== messageId));
      state.chatsByIds[chatId].messages = state.chatsByIds[chatId].messages.filter(
        (msg) => msg._id !== messageId
      );
    },
    setEditableMessage: (state, action: PayloadAction<{ chatId: string; messageId?: string }>) => {
      const { chatId, messageId } = action.payload;
      if (!messageId) {
        state.chatsByIds[chatId].editableMessage = null;
      } else {
        state.chatsByIds[chatId].editableMessage =
          state.chatsByIds[chatId].messages.find((message) => message._id === messageId) || null;
      }
    }
  }
});

export const chatsReducer = chat.reducer;
export const chatsActions = chat.actions;
