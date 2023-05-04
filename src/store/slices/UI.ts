import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'store/interfaces';

interface IInitialState {
  isCenterOpen: boolean;
  isRightOpen: boolean;
  activeChat: IChat;
}

const ui = createSlice({
  name: 'ui',
  initialState: {
    isCenterOpen: false,
    isRightOpen: false
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
    }
  }
});

export const uiActions = ui.actions;
export const uiReducer = ui.reducer;
