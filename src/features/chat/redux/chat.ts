/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'types';

interface UIInitState {
  messages: {
    [id: string]: Array<IMessage>;
  };
}

const initialState: UIInitState = {
  messages: {}
};

export const chat = createSlice({
  name: 'chatArea',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ chatId: string; items: any[] }>) => {
      state.messages[action.payload.chatId] = action.payload.items;
    },
    newMessage: (state, action: PayloadAction<any>) => {
      const chatId = action.payload.chatId;
      state.messages[chatId].push(action.payload);
    }
  }
});

export const chatReducer = chat.reducer;
export const chatActions = chat.actions;
