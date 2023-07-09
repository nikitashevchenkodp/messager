/* eslint-disable prefer-const */
import { getAllMessagesByChatId, getChats, getUsers } from 'services/chats';
import { AppDispatch } from 'store';
import { chatsActions, messagesActions, uiActions, usersActions } from './slices';

export const getAllMessagesByChatIdThunk = (chatId: string) => async (dispatch: AppDispatch) => {
  const messages = await getAllMessagesByChatId(chatId);
  dispatch(messagesActions.setMessages({ chatId, messages: messages.data }));
};

export const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    const users = await getUsers();
    dispatch(usersActions.setUsers(users.data));
    setTimeout(() => {
      dispatch(uiActions.setIsGlobalLoading(false));
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

// export const getChatListaAndMessagesThunk = () => async (dispatch: AppDispatch) => {
//   const chats = await getChats();
//   const messages = await Promise.all(
//     chats.data.map((chat: any) => {
//       const chatId = chat.id;
//       return getAllMessagesByChatId(chatId);
//     })
//   );
//   dispatch(chatsActions.setChats(chats.data));
//   chats.data.forEach
//   return {chats, messages}
// };

export const initialResponse = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(uiActions.setIsGlobalLoading(true));
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
