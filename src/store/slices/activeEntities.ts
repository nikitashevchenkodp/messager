/* eslint-disable @typescript-eslint/no-empty-function */
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';
import { IMessage, IChat } from 'types';

interface UIInitState {
  activeChat: {
    id: string;
    avatar: string;
    title: string;
    selectedMessagesIds: { [id: string]: string };
    activeMessage: IMessage | null;
    isOpenDeleteModal: boolean;
  } & Partial<IChat>;
  activeFolder: string;
}

const initialState: UIInitState = {
  activeChat: {
    id: '',
    avatar: '',
    title: '',
    selectedMessagesIds: {},
    activeMessage: null,
    isOpenDeleteModal: false
  },
  activeFolder: 'All chats'
};

export const activeEntities = createSlice({
  name: 'activeEntities',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<Omit<IChat, 'lastMessage'>>) => {
      state.activeChat = {
        ...action.payload,
        selectedMessagesIds: {},
        activeMessage: null,
        isOpenDeleteModal: false
      };
    },
    setIsOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.activeChat.isOpenDeleteModal = action.payload;
    },
    addToSelectedMessagesIds: (state) => {
      const activeMessageId = state.activeChat.activeMessage?._id;
      if (activeMessageId) state.activeChat.selectedMessagesIds[activeMessageId] = activeMessageId;
    },
    deleteAllSelectedMessagesIds: (state) => {
      state.activeChat.selectedMessagesIds = {};
    },
    setActiveMessage: (state, action: PayloadAction<IMessage>) => {
      state.activeChat.activeMessage = action.payload;
    },
    toggleItemInSelectedMessagesIds: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.activeChat.selectedMessagesIds[id]) {
        delete state.activeChat.selectedMessagesIds[id];
      } else {
        state.activeChat.selectedMessagesIds[id] = id;
      }
    },
    setActiveFolder: (state, action: PayloadAction<any>) => {
      state.activeFolder = action.payload;
    },
    newChatCreated: (state, action: PayloadAction<string>) => {}
  }
});

export const activeEntitiesReducer = activeEntities.reducer;
export const activeEntitiesActions = activeEntities.actions;
