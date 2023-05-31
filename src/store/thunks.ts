/* eslint-disable prefer-const */
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { CanceledError } from 'axios';
import { getAllMessagesByChatId, getChats } from 'services/chats';
import { IMessage } from './interfaces';
import { chatsActions, messagesActions } from './slices';

export const initialResponse = () => async (dispatch: Dispatch) => {
  try {
    const chats = await getChats();
    dispatch(chatsActions.setChats(chats.data));

    chats.data.forEach(async (chat: any) => {
      const chatId = chat.id;
      dispatch(getAllMessagesByChatIdThunk(chatId) as any);
    });
  } catch (e) {
    const error = e as CanceledError<any>;
    if (error.code && error.code === 'ERR_CANCELED') {
      console.log('do nothing');
    }
  }
};

export const getAllMessagesByChatIdThunk = (chatId: string) => async (dispatch: Dispatch) => {
  const messages = await getAllMessagesByChatId(chatId);
  dispatch(messagesActions.setMessages({ chatId, messages: messages.data }));
};
