import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIInitState {
  messages: Array<any>;
}

const initialState: UIInitState = {
  messages: []
};

export const chatAreaSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    }
  }
});

export const chatAreaReducer = chatAreaSlice.reducer;
export const chatAreaActions = chatAreaSlice.actions;
