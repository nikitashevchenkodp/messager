/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserItem {
  [id: string]: {
    typing: boolean;
  };
}

interface UIInitState {
  users: UserItem;
}

const initialState: UIInitState = {
  users: {}
};

export const online = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<string[]>) => {
      state.users = action.payload.reduce((acc, item) => {
        acc[item] = { typing: false };
        return acc;
      }, {} as UserItem);
    },
    setTypingStatus: (state, action: PayloadAction<{ userId: string; typing: boolean }>) => {
      const { userId, typing } = action.payload;
      state.users[userId] = { typing };
    }
  }
});

export const onlineReducer = online.reducer;
export const onlineActions = online.actions;

// interface UserItem {
//   [id: string]: {
//     online: boolean;
//     typing: boolean;
//     lastSeen: string;
//   };
// }
