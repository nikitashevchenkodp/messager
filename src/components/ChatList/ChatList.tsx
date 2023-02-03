import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SearchIcon } from '../icons';
import Resizer from '../Resizer/Resizer';
import ChatListItem from './ChatListItem/ChatListItem';
import SearchInput from './SearchInput/SearchInput';
import { ChatListContainer, ChatListHeader, ChatListStyled, List } from './srtyled';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);
  const windowWidth = useAppSelector((state) => state.ui.windowWidth);
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const chatListWidth = useAppSelector((state) => state.ui.chatListWidth);
  const [val, setVal] = useState('');

  return (
    <ChatListContainer isHideChatList={isHideChatList} withTransition={windowWidth < 756}>
      <ChatListStyled
        isHideChatList={isHideChatList}
        withTransition={windowWidth < 756}
        defaultWidth={chatListWidth}>
        <ChatListHeader>
          {chatListState === 'expanded' ? (
            <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
          ) : (
            <SearchIcon onClick={() => console.log('expand')} cursor="pointer" />
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
        </List>
      </ChatListStyled>
      <Resizer minWidth={300} edgeCaseWidth={70} />
    </ChatListContainer>
  );
};

export default ChatList;
