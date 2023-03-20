/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStatusesById {
  [id: string]: {
    typing: boolean;
  };
}

interface IUser {
  _id: string;
  fullName: string;
  avatar: string;
  email: string;
}

interface UIInitState {
  usersById: {
    [id: string]: IUser;
  };
  statusesById: IStatusesById;
}

const initialState: UIInitState = {
  usersById: {},
  statusesById: {}
};

export const users = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<string[]>) => {
      state.statusesById = action.payload.reduce((acc, item) => {
        acc[item] = { typing: false };
        return acc;
      }, {} as IStatusesById);
    },
    setTypingStatus: (state, action: PayloadAction<{ userId: string; typing: boolean }>) => {
      const { userId, typing } = action.payload;
      state.statusesById[userId] = { typing };
    }
  }
});

export const usersReducer = users.reducer;
export const usersActions = users.actions;

// interface UserItem {
//   [id: string]: {
//     online: boolean;
//     typing: boolean;
//     lastSeen: string;
//   };
// }
