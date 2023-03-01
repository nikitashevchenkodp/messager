import axios from 'axios';
import { SearchIcon } from 'components/icons';
import Resizer from 'components/Resizer/Resizer';
import { CHAT_LIST_MIN_WIDTH, CHAT_LIST_WIDTH_COLAPSED } from 'consts';
import { chatsActions } from 'features/chat-list/redux/chats';
import WindowEvent from 'helpers/WindowEventWrapper';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices/UI';
import ChatListItem from '../ChatListItem/ChatListItem';
import SearchInput from '../SearchInput/SearchInput';
import { ChatListContainer, ChatListHeader, ChatListStyled, List } from './styled';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const chatListWidth = useAppSelector((state) => state.ui.chatListWidth);
  const chatList = useAppSelector((state) => state.chats.chats);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const [val, setVal] = useState('');
  const wind = useRef(window);

  const resizeHandler = () => {
    const windowWidth = wind.current.innerWidth;
    if (windowWidth <= 756) {
      if (!isHideChatList) dispatch(uiActions.hideChatList());
      dispatch(uiActions.setChatListState('expanded'));
    }
    if (windowWidth > 756) {
      if (isHideChatList) dispatch(uiActions.showChatList());
    }
  };

  const handleClick = () => {
    dispatch(uiActions.setChatListWidth(CHAT_LIST_MIN_WIDTH));
  };

  const setupActiveChat = (id: string) => {
    const activeChat = chatList.filter((chat) => chat.chatId === id)[0];
    dispatch(
      chatsActions.setActiveChat({
        id: activeChat.chatId,
        withWhom: activeChat.withWhomChat,
        withWhomId: activeChat.withWhomId
      })
    );
    if (wind.current.innerWidth < 756) {
      if (!isHideChatList) dispatch(uiActions.hideChatList());
    }
  };

  return (
    <>
      <WindowEvent eventType="resize" handler={resizeHandler} />
      <ChatListContainer isHideChatList={isHideChatList}>
        <ChatListStyled isHideChatList={isHideChatList} style={{ width: chatListWidth }}>
          <ChatListHeader>
            {chatListState === 'expanded' ? (
              <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
            ) : (
              <SearchIcon onClick={handleClick} cursor="pointer" />
            )}
          </ChatListHeader>
          <List>
            {chatList.length ? (
              chatList?.map((chatItem) => {
                return (
                  <ChatListItem
                    chatItem={chatItem}
                    key={chatItem.chatId}
                    active={chatItem.chatId === activeChat?.id}
                    onClick={() => setupActiveChat(chatItem.chatId)}
                  />
                );
              })
            ) : (
              <>Nothing</>
            )}
          </List>
        </ChatListStyled>
        <Resizer
          minWidth={CHAT_LIST_MIN_WIDTH}
          edgeCaseWidth={CHAT_LIST_WIDTH_COLAPSED}
          delayInPixels={50}
        />
      </ChatListContainer>
    </>
  );
};

export default ChatList;
