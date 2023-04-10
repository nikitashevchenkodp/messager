/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  user: any;
  isAuth: boolean;
}

const initialState: UIInitState = {
  user: null,
  isAuth: false
};

export const authenticationSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<any>) => {},
    signupStart: (state, action: PayloadAction<any>) => {},
    loginUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.isAuth = true;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    }
  }
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
