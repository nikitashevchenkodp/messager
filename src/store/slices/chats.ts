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
    },
    addChat: (state, action: PayloadAction<any>) => {
      console.log('new chat added');
    },
    togglePinChat: (state, action: PayloadAction<string>) => {
      console.log('toggle pin chat');
    },
    toggleMuteChat: (state, action: PayloadAction<string>) => {
      console.log('toggle mute chat');
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      console.log('chat deleted');
    },
    changeOrderChat: (state, action: PayloadAction<number>) => {
      console.log('chat reordered');
    }
  }
});

export const chatsActions = chats.actions;
export const chatsReducer = chats.reducer;
