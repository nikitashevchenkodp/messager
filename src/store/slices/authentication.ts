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
    loginUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    }
  }
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
