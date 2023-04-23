/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReaction } from 'blocks/message/Reactions/Reactions';
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
      lastScrollOffset?: number;
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
      console.log(action.payload);

      state.byChatId[chatId].messages[_id] = action.payload;
      state.byChatId[chatId].messagesIds.push(_id);
    },
    startDeleteMessages: (
      state,
      action: PayloadAction<{ chatId: string; messagesIds: string[] }>
    ) => {},
    deleteMessages: (state, action: PayloadAction<{ chatId: string; messagesIds: string[] }>) => {
      const { chatId, messagesIds } = action.payload;
      messagesIds.forEach((id) => {
        delete state.byChatId[chatId].messages[id];
        state.byChatId[chatId].messagesIds = state.byChatId[chatId].messagesIds.filter(
          (msgId) => msgId !== id
        );
      });
    },
    editMessage: (state, action: PayloadAction<IMessage>) => {
      const { chatId, _id } = action.payload;
      console.log(action.payload);

      state.byChatId[chatId].messages[_id] = action.payload;
    },
    addReaction: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string; reactions: IReaction[] }>
    ) => {
      const { chatId, messageId, reactions } = action.payload;
      state.byChatId[chatId].messages[messageId].reactions = reactions;
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
    setEditableMessage: (state, action: PayloadAction<{ chatId: string; messageId: string }>) => {
      const { chatId, messageId } = action.payload;
      if (!messageId) {
        state.byChatId[chatId].editableMessage = null;
      } else {
        state.byChatId[chatId].editableMessage = state.byChatId[chatId].messages[messageId];
      }
    },
    setLastScrollOffset: (state, action: PayloadAction<{ chatId: string; offset: number }>) => {
      const { chatId, offset } = action.payload;
      state.byChatId[chatId].lastScrollOffset = offset;
    }
  }
});

export const messagesReducer = messages.reducer;
export const messagesActions = messages.actions;
