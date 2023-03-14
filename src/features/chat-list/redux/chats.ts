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
    }
  }
});

export const chatListReducer = chatList.reducer;
export const chatListActions = chatList.actions;
