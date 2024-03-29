import { CircularProgress } from '@mui/material';
import { SearchIcon } from 'components/icons';
import ResizableContainer from 'components/ResizableContainer';
import { log } from 'console';
import { CHAT_LIST_MIN_WIDTH } from 'consts';
import React, { useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { uiSettingsActions } from 'store/slices/UI';
import { IChat } from 'types';
import ChatListItem from '../ChatListItem/ChatListItem';
import SearchInput from '../SearchInput/SearchInput';
import {
  ChatListContainer,
  ChatListContainerSmallScreen,
  ChatListHeader,
  ChatListStyled,
  List
} from './styled';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const isHideChatList = useAppSelector((state) => state.ui.uiSettings.isHideChatList);
  const chatListState = useAppSelector((state) => state.ui.uiSettings.chatListState);
  const chatList = useAppSelector((state) => state.entities.chats.items);
  const loading = useAppSelector((state) => state.entities.chats.isLoading);
  const activeChat = useAppSelector((state) => state.entities.active.activeChat);
  const [val, setVal] = useState('');

  const handleClick = () => {
    dispatch(uiSettingsActions.setChatListWidth(CHAT_LIST_MIN_WIDTH));
  };

  const setupActiveChat = (chatItem: IChat) => {
    const { chatId, user } = chatItem;
    dispatch(
      activeEntitiesActions.setActiveChat({
        chatId,
        user
      })
    );
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
      <ChatListContainer>
        <ResizableContainer>
          <ChatListStyled data-testid="chat-list">
            <ChatListHeader>
              {chatListState === 'expanded' ? (
                <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
              ) : (
                <SearchIcon onClick={handleClick} cursor="pointer" />
              )}
            </ChatListHeader>
            <List>{list()}</List>
          </ChatListStyled>
        </ResizableContainer>
      </ChatListContainer>

      <ChatListContainerSmallScreen isHide={isHideChatList}>
        {!isHideChatList && (
          <>
            <ChatListStyled>
              <ChatListHeader>
                <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
              </ChatListHeader>
              <List>{list()}</List>
            </ChatListStyled>
          </>
        )}
      </ChatListContainerSmallScreen>
    </>
  );
};

export default ChatList;
