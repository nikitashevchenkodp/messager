import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChat } from 'store/interfaces';
import { arrayOfIds, arrayToObject } from 'utils/arrToObj';
import { chats as mockChats } from 'utils/mock/Chats';
interface IInitialState {
  byId: {
    [id: string]: IChat;
  };
  chatIds: string[];
}

const initialState = {
  byId: arrayToObject(mockChats, 'id'),
  chatIds: arrayOfIds(mockChats, 'id')
} as IInitialState;

const chats = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IChat[]>) => {
      state.byId = arrayToObject(action.payload, 'id');
      state.chatIds = arrayOfIds(action.payload, 'id');
    }
  }
});

export const chatsActions = chats.actions;
export const chatsReducer = chats.reducer;
