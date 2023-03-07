/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserItem {
  [id: string]: {
    typing: boolean;
  };
}

interface UIInitState {
  online: string[];
  onlineMap: UserItem;
}

const initialState: UIInitState = {
  online: [],
  onlineMap: {}
};

export const usersStatuses = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<string[]>) => {
      state.online = action.payload;
      state.onlineMap = action.payload.reduce((acc, item) => {
        acc[item] = { typing: false };
        return acc;
      }, {} as UserItem);
    },
    setTypingStatus: (state, action: PayloadAction<{ userId: string; typing: boolean }>) => {
      const { userId, typing } = action.payload;
      state.onlineMap[userId] = { typing };
    }
  }
});

export const usersStatusesReducer = usersStatuses.reducer;
export const usersStatusesActions = usersStatuses.actions;

// interface UserItem {
//   [id: string]: {
//     online: boolean;
//     typing: boolean;
//     lastSeen: string;
//   };
// }
