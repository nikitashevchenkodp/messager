import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isCenterOpen: boolean;
  isRightOpen: boolean;
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
    }
  }
});

export const uiActions = ui.actions;
export const uiReducer = ui.reducer;
