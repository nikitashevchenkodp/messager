import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  user: any;
  isAuth: boolean;
  accessToken: string;
}

const user = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuth: false,
    accessToken: ''
  } as IInitialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload;
    }
  }
});

export const userActions = user.actions;
export const userReducer = user.reducer;
