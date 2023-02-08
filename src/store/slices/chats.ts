import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatInfo {
  title: string;
  lastMessage: {
    messageMediaThumb?: string;
    text: string;
    time: string;
  };
  avatar: string;
  chatId: number;
}

interface UIInitState {
  activeChat: number | null;
  chats: Array<ChatInfo>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UIInitState = {
  activeChat: null,
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
    setChats: (state, action: PayloadAction<ChatInfo[]>) => {
      console.log('setChats', action);
      state.chats = action.payload;
      console.log(state.chats);
    },
    setActiveChat: (state, action: PayloadAction<number>) => {
      state.activeChat = action.payload;
    }
  }
});

export const chatsReducer = chatsSlice.reducer;
export const chatsActions = chatsSlice.actions;
