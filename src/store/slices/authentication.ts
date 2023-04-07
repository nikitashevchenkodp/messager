/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  user: any;
}

const initialState: UIInitState = {
  user: null
};

export const authenticationSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<any>) => {},
    signupStart: (state, action: PayloadAction<any>) => {},
    loginUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  }
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
