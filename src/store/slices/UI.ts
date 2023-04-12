import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CHAT_LIST_MIN_WIDTH } from 'consts';

interface UIInitState {
  windowWidth: number;
  chatListState: 'expanded' | 'colapsed';
  chatListWidth: number;
  isChatOpen: boolean;
}

const initialState: UIInitState = {
  windowWidth: window.innerWidth,
  chatListState: 'expanded',
  chatListWidth: CHAT_LIST_MIN_WIDTH,
  isChatOpen: true
};

export const uiSettings = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload;
    },
    setChatState: (state, action: PayloadAction<boolean>) => {
      state.isChatOpen = action.payload;
    },
    setChatListState: (state, action: PayloadAction<'expanded' | 'colapsed'>) => {
      if (action.payload === 'colapsed') {
        state.chatListWidth = 70;
      } else {
        state.chatListWidth = CHAT_LIST_MIN_WIDTH;
      }
      state.chatListState = action.payload;
    },
    setChatListWidth: (state, action: PayloadAction<number>) => {
      state.chatListWidth = action.payload;
      if (action.payload === 70) {
        state.chatListState = 'colapsed';
      } else {
        state.chatListState = 'expanded';
      }
    }
  }
});

export const uiSettingsReducer = uiSettings.reducer;
export const uiSettingsActions = uiSettings.actions;
