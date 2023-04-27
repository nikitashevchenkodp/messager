/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'types';

interface UIInitState {
  messagesIds: string[];
  messagesById: {
    [id: string]: IMessage & { fromQueue: boolean };
  };
}

const initialState: UIInitState = {
  messagesIds: [],
  messagesById: {}
};

export const sentMessagesQueue = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<IMessage>) => {
      const { _id, chatId } = action.payload;
      state.messagesIds.push(_id);
      state.messagesById[_id] = { ...action.payload, fromQueue: true };
    },
    removeById: (state, action: PayloadAction<string>) => {
      const msgId = action.payload;
      state.messagesIds = state.messagesIds.filter((id) => id !== msgId);
      delete state.messagesById[msgId];
    },
    clearQueue: (state) => {
      state.messagesIds = [];
      state.messagesById = {};
    }
  }
});

export const sentMessagesQueueReducer = sentMessagesQueue.reducer;
export const sentMessagesQueueActions = sentMessagesQueue.actions;
