/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  user: any;
  isAuth: boolean;
  accessToken: string;
}

const initialState: UIInitState = {
  user: null,
  isAuth: false,
  accessToken: ''
};

export const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<any>) => {},
    signupStart: (state, action: PayloadAction<any>) => {},
    loginUser: (state, action: PayloadAction<any>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.isAuth = true;
      state.accessToken = accessToken;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      console.log('call setAuth action');

      state.isAuth = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    checkAuth: () => {}
  }
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
