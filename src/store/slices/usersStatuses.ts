/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayToObject } from 'utils/arrayToObject';

interface IUsersById {
  [id: string]: IUser;
}

interface IStatusesById {
  [id: string]: {
    online: boolean;
    typing: boolean;
    lastTimeOnline: number;
  };
}

interface IUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  chatId: string;
  lastTimeOnline?: number;
}

interface UIInitState {
  usersById: {
    [id: string]: IUser;
  };
  statusesById: IStatusesById;
  userIds: string[];
}

const initialState: UIInitState = {
  usersById: {},
  statusesById: {},
  userIds: []
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      const { payload } = action;
      state.usersById = arrayToObject(payload, 'id');
      state.statusesById = action.payload.reduce((acc, user) => {
        acc[user.id] = { online: false, lastTimeOnline: user.lastTimeOnline || 0, typing: false };
        return acc;
      }, {} as IStatusesById);
      state.userIds = action.payload.reduce((acc, user) => {
        acc.push(user.id);
        return acc;
      }, [] as string[]);
    },
    setOnlineList: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((userId) => {
        state.statusesById[userId] = { ...state.statusesById[userId], online: true };
      });
      return state;
    },
    setTypingStatus: (state, action: PayloadAction<{ userId: string; typing: boolean }>) => {
      const { userId, typing } = action.payload;
      state.statusesById[userId] = { ...state.statusesById[userId], typing };
    },
    addOnlineUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.statusesById[userId] = { ...state.statusesById[userId], online: true };
    },
    delOnlineUser: (state, action: PayloadAction<{ userId: string; lastTimeOnline: number }>) => {
      const { userId, lastTimeOnline } = action.payload;
      state.statusesById[userId] = {
        ...state.statusesById[userId],
        online: false,
        lastTimeOnline: lastTimeOnline
      };
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
