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
    addChat: (state, action: PayloadAction<IChat>) => {
      const { id } = action.payload;
      state.byId[id] = action.payload;
      state.chatIds.push(id);
    },
    togglePinChat: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.byId[id].isPinned = !state.byId[id].isPinned;
    },
    toggleMuteChat: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.byId[id].isMuted = !state.byId[id].isMuted;
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
      state.chatIds = state.chatIds.filter((chatId) => chatId !== id);
    },
    changeOrderChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.chatIds = [chatId, ...state.chatIds.filter((id) => id !== chatId)];
    }
  }
});

export const chatsActions = chats.actions;
export const chatsReducer = chats.reducer;
