import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  windowWidth: number;
  isHideChatList: boolean;
  chatListState: 'expanded' | 'colapsed';
  chatListWidth: number;
}

const initialState: UIInitState = {
  windowWidth: window.innerWidth,
  isHideChatList: window.innerWidth < 756,
  chatListState: 'expanded',
  chatListWidth: 300
};

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setWindowWidth: (state) => {
      state.windowWidth = window.innerWidth;
    },
    hideChatList: (state) => {
      state.isHideChatList = true;
    },
    showChatList: (state) => {
      state.isHideChatList = false;
    },
    setChatListState: (state, action: PayloadAction<'expanded' | 'colapsed'>) => {
      state.chatListState = action.payload;
    },
    setChatListWidth: (state, action: PayloadAction<number>) => {
      state.chatListWidth = action.payload;
    }
  }
});

export const uiReducer = UISlice.reducer;
export const uiActions = UISlice.actions;
