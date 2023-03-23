/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReaction } from 'features/message/Reactions/Reactions';
import { IMessage } from 'types';
import { arrayOfIds, arrayToObject } from 'utils/arrayToObject';

interface UIInitState {
  byChatId: {
    [id: string]: {
      chatId: string;
      messages: {
        [id: string]: IMessage;
      };
      messagesIds: string[];
      editableMessage: IMessage | null;
    };
  };
}

const initialState: UIInitState = {
  byChatId: {}
};

export const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<{ chatId: string; messages: any[] }>) => {
      const { chatId, messages } = action.payload;
      const messagesById = arrayToObject(messages, '_id');
      const messagesIds = arrayOfIds(messages, '_id');
      state.byChatId[action.payload.chatId] = {
        chatId,
        messages: messagesById,
        messagesIds,
        editableMessage: null
      };
    },
    newMessage: (state, action: PayloadAction<IMessage>) => {
      const { chatId, _id } = action.payload;
      state.byChatId[chatId].messages[_id] = action.payload;
      state.byChatId[chatId].messagesIds.push(_id);
    },
    startDeleteMessage: (state, action: PayloadAction<IMessage>) => {},
    deleteMessage: (state, action: PayloadAction<{ chatId: string; messageId: string }>) => {
      const { chatId, messageId } = action.payload;
      delete state.byChatId[chatId].messages[messageId];
      state.byChatId[chatId].messagesIds = state.byChatId[chatId].messagesIds.filter(
        (id) => id !== messageId
      );
    },
    editMessage: (state, action: PayloadAction<IMessage>) => {
      const { chatId, _id } = action.payload;
      state.byChatId[chatId].messages[_id] = action.payload;
    },
    addReaction: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string; reaction: IReaction }>
    ) => {
      const { chatId, messageId, reaction } = action.payload;
      state.byChatId[chatId].messages[messageId].reactions.push(reaction);
    },
    deleteReaction: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string; reactionId: string }>
    ) => {
      const { chatId, messageId, reactionId } = action.payload;
      state.byChatId[chatId].messages[messageId].reactions = state.byChatId[chatId].messages[
        messageId
      ].reactions.filter((reaction) => reaction._id !== reactionId);
    },
    setEditableMessage: (state, action: PayloadAction<{ chatId: string; messageId?: string }>) => {
      const { chatId, messageId } = action.payload;
      if (!messageId) {
        state.byChatId[chatId].editableMessage = null;
      } else {
        state.byChatId[chatId].editableMessage = state.byChatId[chatId].messages[messageId];
      }
    }
  }
});

export const messagesReducer = messages.reducer;
export const messagesActions = messages.actions;
