import React, { useState } from 'react';
import { CHAT_LIST_MIN_WIDTH, CHAT_LIST_WIDTH_COLAPSED } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/slices/UI';
import { SearchIcon } from '../icons';
import Resizer from '../Resizer/Resizer';
import ChatListItem from './ChatListItem/ChatListItem';
import SearchInput from './SearchInput/SearchInput';
import { ChatListContainer, ChatListHeader, ChatListStyled, List } from './srtyled';
import WindowEvent from '../../helpers/WindowEventWrapper';

const ChatList = () => {
  console.log('render ChatList');

  const dispatch = useAppDispatch();
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const chatListWidth = useAppSelector((state) => state.ui.chatListWidth);
  const [val, setVal] = useState('');

  const resizeHandler = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 756) {
      if (!isHideChatList) dispatch(uiActions.hideChatList());
    }
    if (windowWidth > 756) {
      if (isHideChatList) dispatch(uiActions.showChatList());
    }
  };

  const handleClick = () => {
    dispatch(uiActions.setChatListWidth(CHAT_LIST_MIN_WIDTH));
    dispatch(uiActions.setChatListState('expanded'));
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
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
            <ChatListItem />
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
