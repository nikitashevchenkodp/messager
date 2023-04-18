import React, { Suspense, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import ChatArea from '../ChatArea/ChatArea';
import ChatControls from '../ChatControls/ChatControls';
import ChatHeader from '../ChatHeader/ChatHeader';
import SelectedMessagesMenu from '../SelectedMessagesMenu';

import { ChatStyled, NoActveChats, SelectChat } from './styled';
import { getActiveChat, getChatIsOpen } from 'store/selectors';

const Chat = () => {
  const activeChat = useAppSelector(getActiveChat);
  const isChatOpen = useAppSelector(getChatIsOpen);

  return (
    <ChatStyled data-testid="chat" isChatOpen={isChatOpen}>
      {activeChat.user ? (
        <>
          {' '}
          <SelectedMessagesMenu />
          <ChatHeader />
          <ChatArea />
          <ChatControls />
        </>
      ) : (
        <NoActveChats>
          <SelectChat>Please select a chat</SelectChat>
        </NoActveChats>
      )}
    </ChatStyled>
  );
};

export default Chat;
