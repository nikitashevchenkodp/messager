import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  windowWidth: window.innerWidth,
  isHideChatList: window.innerWidth < 756
};

export const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setWindowWidth: (state) => {
      state.windowWidth = window.innerWidth;
    },
    hideChatList: (state) => {
      console.log('hide');

      state.isHideChatList = true;
    },
    showChatList: (state) => {
      console.log('show');

      state.isHideChatList = false;
    }
  }
});

export const uiReducer = UISlice.reducer;
export const uiActions = UISlice.actions;
