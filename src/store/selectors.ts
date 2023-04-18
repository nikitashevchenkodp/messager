import { RootState } from 'store';

export const getChatListState = (state: RootState) => state.ui.uiSettings.chatListState;
export const getActiveChatId = (state: RootState) => state.entities.active.activeChat.chatId;

export const getUserStatusById = (state: RootState, userId: string) =>
  state.users.statusesById[userId];
export const getLastMessage = (state: RootState, chatId: string) => {
  const messagesIds = state.entities.messages.byChatId[chatId]?.messagesIds;
  const lastMessageId = messagesIds?.[messagesIds.length - 1];
  const lastMessage = state.entities.messages.byChatId[chatId]?.messages[lastMessageId];
  return lastMessage;
};
export const getLastMessageFromActiveChat = (state: RootState) => {
  const activeChatId = getActiveChatId(state);
  const lastMessage = getLastMessage(state, activeChatId);
  return lastMessage;
};

export const getEditableMessage = (state: RootState) => {
  const activeChatId = getActiveChatId(state);
  const editableMessage = state.entities.messages.byChatId[activeChatId]?.editableMessage;
  return editableMessage;
};

export const getActiveChatUser = (state: RootState) => state.entities.active.activeChat?.user;

export const getActiveChat = (state: RootState) => state.entities.active.activeChat;
export const getChatListLoading = (state: RootState) => state.entities.chats.isLoading;
export const getChatList = (state: RootState) => state.entities.chats.items;
export const getChatIsOpen = (state: RootState) => state.ui.uiSettings.isChatOpen;
export const getCurrentUser = (state: RootState) => state.authentication.user;
export const getActiveMessage = (state: RootState) =>
  state.entities.active.activeChat.activeMessage;
export const getIsModalOpen = (state: RootState) =>
  state.entities.active.activeChat.isOpenDeleteModal;

export const getTypingStatusByUserId = (state: RootState, id: string) =>
  state.users.statusesById[id]?.typing;

export const getActiveChatMessages = (state: RootState) => {
  const activeChatId = getActiveChatId(state);
  const messages = state.entities.messages.byChatId[activeChatId]?.messages;
  return messages;
};
export const getActiveChatMessagesIds = (state: RootState) => {
  const activeChatId = getActiveChatId(state);
  const messagesIds = state.entities.messages.byChatId[activeChatId]?.messagesIds;
  return messagesIds;
};

export const getScrollOffsetByChatId = (state: RootState) => {
  const activeChatId = getActiveChatId(state);
  return state.entities.messages.byChatId[activeChatId]?.lastScrollOffset;
};

export const getSelectedMessagesLength = (state: RootState) =>
  Object.keys(state.entities.active.activeChat.selectedMessagesIds).length;
export const getSelectedMessagesIds = (state: RootState) =>
  Object.keys(state.entities.active.activeChat.selectedMessagesIds);

export const getActiveFolder = (state: RootState) => state.entities.active.activeFolder;
export const getFolders = (state: RootState) => state.entities.folders.items;
export const getCurrentUserId = (state: RootState) => getCurrentUser(state)._id;
export const isEditMessageAvailable = (state: RootState) => {
  return getCurrentUserId(state) === getActiveMessage(state)?.from;
};
export const isMessageSelected = (state: RootState, id: string) =>
  Boolean(state.entities.active.activeChat?.selectedMessagesIds[id]);
export const getMessageById = (state: RootState, chatId: string, messageId: string) => {
  return state.entities.messages.byChatId[chatId].messages[messageId];
};

export const isSelectionModeOn = (state: RootState) => {
  return Object.values(state.entities.active.activeChat.selectedMessagesIds).length > 0;
};

export const getIsSidebarOpen = (state: RootState) => state.ui.sidebar.isOpen;
export const getUserStatuses = (state: RootState) => state.users.statusesById;
export const getUsersIds = (state: RootState) => state.users.userIds;
export const getUsersById = (state: RootState) => state.users.usersById;
export const getChatListWidth = (state: RootState) => state.ui.uiSettings.chatListWidth;
export const getIsAuth = (state: RootState) => state.authentication.isAuth;
