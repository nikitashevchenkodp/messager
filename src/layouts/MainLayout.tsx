import { Chat } from 'features/chat';
import { ChatList } from 'features/chat-list';
import { Folders } from 'features/folders';
import React from 'react';

import { MainLayoutStyled } from './styled';

const MainLayout = () => {
  return (
    <MainLayoutStyled>
      <Folders />
      <ChatList />
      <Chat />
    </MainLayoutStyled>
  );
};

export default MainLayout;
