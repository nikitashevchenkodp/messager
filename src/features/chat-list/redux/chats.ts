import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'types';

interface IUser {
  id: string;
  fullName: string;
}

interface UIInitState {
  activeUser: IUser | null;
  chats: Array<IChat>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UIInitState = {
  activeUser: null,
  chats: [],
  isLoading: false,
  isError: false
};

export const chatsSlice = createSlice({
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
      state.chats = action.payload;
    },
    setActiveUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.activeUser = action.payload;
    }
  }
});

export const chatsReducer = chatsSlice.reducer;
export const chatsActions = chatsSlice.actions;
