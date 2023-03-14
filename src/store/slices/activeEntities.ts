/* eslint-disable @typescript-eslint/no-empty-function */
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';
import { IChat } from 'types';

interface UIInitState {
  activeChat: Omit<IChat, 'lastmMessage'> | null;
  activeFolder: string;
}

const initialState: UIInitState = {
  activeChat: null,
  activeFolder: 'All chats'
};

export const activeEntities = createSlice({
  name: 'activeEntities',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<any>) => {
      state.activeChat = action.payload;
    },
    setActiveFolder: (state, action: PayloadAction<any>) => {
      state.activeFolder = action.payload;
    },
    newChatCreated: (state, action: PayloadAction<string>) => {
      if (state.activeChat) {
        state.activeChat.chatId = action.payload;
      }
    }
  }
});

export const activeEntitiesReducer = activeEntities.reducer;
export const activeEntitiesActions = activeEntities.actions;
