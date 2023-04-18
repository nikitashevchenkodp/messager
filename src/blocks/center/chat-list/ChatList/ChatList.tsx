import { CircularProgress } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { uiSettingsActions } from 'store/slices/UI';
import { IChat } from 'types';
import ChatListItem from '../ChatListItem/ChatListItem';
import { List } from './styled';
import { getActiveChat, getChatList, getChatListLoading, getChatListState } from 'store/selectors';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const chatListState = useAppSelector(getChatListState);
  const chatList = useAppSelector(getChatList);
  const loading = useAppSelector(getChatListLoading);
  const activeChat = useAppSelector(getActiveChat);

  const setupActiveChat = (chatItem: IChat) => {
    const { chatId, user } = chatItem;
    dispatch(
      activeEntitiesActions.setActiveChat({
        chatId,
        user
      })
    );
    dispatch(uiSettingsActions.setChatState(true));
  };

  const list = () => {
    if (loading) {
      return (
        <div
          style={{ textAlign: 'center', marginTop: '20px' }}
          data-testid="chat-list-loading-descktop">
          <CircularProgress />
        </div>
      );
    }

    if (!chatList.length) {
      return (
        <div
          style={{ textAlign: 'center', marginTop: '20px' }}
          data-testid="chat-list-loading-descktop">
          You do not have any chats yet
        </div>
      );
    }

    return (
      <>
        {chatList?.map((chatItem) => {
          return (
            <ChatListItem
              chatItem={chatItem}
              key={chatItem.chatId}
              active={chatItem.chatId === activeChat?.chatId}
              onClick={() => setupActiveChat(chatItem)}
              type={chatListState}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      <List>{list()}</List>
    </>
  );
};

export default ChatList;
