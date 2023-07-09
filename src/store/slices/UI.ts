import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat, LeftContent } from 'store/interfaces';

interface IInitialState {
  isCenterOpen: boolean;
  isRightOpen: boolean;
  activeChat: IChat;
  leftContent: LeftContent;
  isGlobalLoading: boolean;
}

const ui = createSlice({
  name: 'ui',
  initialState: {
    isCenterOpen: false,
    isRightOpen: false,
    isGlobalLoading: true,
    leftContent: LeftContent.ChatList
  } as IInitialState,
  reducers: {
    openCenter: (state) => {
      state.isCenterOpen = true;
    },
    closeCenter: (state) => {
      state.isCenterOpen = false;
    },
    openRight: (state) => {
      state.isRightOpen = true;
    },
    closeRight: (state) => {
      state.isRightOpen = false;
    },
    setActiveChat: (state, action: PayloadAction<IChat>) => {
      state.activeChat = action.payload;
    },
    setLeftContent: (state, action: PayloadAction<LeftContent>) => {
      state.leftContent = action.payload;
    },
    setIsGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload;
    }
  }
});

export const uiActions = ui.actions;
export const uiReducer = ui.reducer;
