/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  messages: Array<any>;
  typingStatus: any;
}

const initialState: UIInitState = {
  messages: [],
  typingStatus: {
    status: '',
    userWhoTiping: ''
  }
};

export const chatAreaSlice = createSlice({
  name: 'chatArea',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<any>) => {
      console.log('set messages');
      state.messages = action.payload;
    },
    newMessage: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, action.payload];
    },
    typing: (state, action: PayloadAction<string>) => {},
    setTyping: (state, action: PayloadAction<any>) => {
      state.typingStatus = action.payload;
    }
  }
});

export const chatAreaReducer = chatAreaSlice.reducer;
export const chatAreaActions = chatAreaSlice.actions;
