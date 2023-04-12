import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'types';

interface UIInitState {
  items: Array<IChat>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UIInitState = {
  items: [],
  isLoading: false,
  isError: false
};

export const chatList = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setChats: (state, action: PayloadAction<Array<IChat>>) => {
      state.items = action.payload;
    },
    addChat: (state, action: PayloadAction<IChat>) => {
      state.items.push(action.payload);
    },
    removeChat: (state, action: PayloadAction<string>) => {
      state.items.filter((chat) => chat.chatId !== action.payload);
    }
  }
});

export const chatsReducer = chatList.reducer;
export const chatsActions = chatList.actions;
