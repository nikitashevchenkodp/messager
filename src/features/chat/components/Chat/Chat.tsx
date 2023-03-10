import React, { Suspense } from 'react';
import { useAppSelector } from 'store/hooks';
import ChatArea from '../ChatArea/ChatArea';
import ChatControls from '../ChatControls/ChatControls';
import ChatHeader from '../ChatHeader/ChatHeader';

import { ChatStyled, NoActveChats, SelectChat } from './styled';

const Chat = () => {
  const activeChat = useAppSelector((state) => state.chats.activeUser);

  return (
    <ChatStyled>
      {activeChat ? (
        <>
          {' '}
          <ChatHeader />
          <Suspense fallback={<p>Loading...</p>}>
            <ChatArea />
          </Suspense>
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
