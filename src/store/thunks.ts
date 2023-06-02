/* eslint-disable prefer-const */
import { getAllMessagesByChatId, getChats, getUsers } from 'services/chats';
import { AppDispatch } from 'store';
import { chatsActions, messagesActions, usersActions } from './slices';

export const getAllMessagesByChatIdThunk = (chatId: string) => async (dispatch: AppDispatch) => {
  const messages = await getAllMessagesByChatId(chatId);
  dispatch(messagesActions.setMessages({ chatId, messages: messages.data }));
};

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const users = await getUsers();
    dispatch(usersActions.setUsers(users.data));
  } catch (error) {
    console.log(error);
  }
};

export const initialResponse = () => async (dispatch: AppDispatch) => {
  try {
    const chats = await getChats();
    dispatch(chatsActions.setChats(chats.data));
    chats.data.forEach(async (chat: any) => {
      const chatId = chat.id;
      dispatch(getAllMessagesByChatIdThunk(chatId));
    });
    dispatch(getAllUsers());
  } catch (e) {
    console.log(e);
  }
};
