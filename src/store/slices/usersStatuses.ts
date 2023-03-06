/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  online: string[];
  typing: string[];
}

const initialState: UIInitState = {
  online: [],
  typing: []
};

export const usersStatuses = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<string[]>) => {
      state.online = action.payload;
    }
  }
});

export const usersStatusesReducer = usersStatuses.reducer;
export const usersStatusesActions = usersStatuses.actions;
