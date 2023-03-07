/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  messages: Array<any>;
}

const initialState: UIInitState = {
  messages: []
};

export const chatAreaSlice = createSlice({
  name: 'chatArea',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    },
    newMessage: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, action.payload];
    }
  }
});

export const chatAreaReducer = chatAreaSlice.reducer;
export const chatAreaActions = chatAreaSlice.actions;
