import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CHAT_LIST_MIN_WIDTH } from '../../consts';

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
  chatListWidth: CHAT_LIST_MIN_WIDTH
};

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload;
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
