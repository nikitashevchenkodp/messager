/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  isOpen: boolean;
}

const initialState: UIInitState = {
  isOpen: false
};

export const sidebar = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    }
  }
});

export const sidebarReducer = sidebar.reducer;
export const sidebarActions = sidebar.actions;
