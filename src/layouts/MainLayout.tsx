import { Chat } from 'blocks/chat';
import { ChatList } from 'blocks/chat-list';
import { Folders } from 'blocks/folders';
import { Sidebar } from 'blocks/sidebar';

import React, { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

import { MainContainer, MainLayoutStyled } from './styled';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: 'innit' });
  }, []);

  return (
    <>
      <MainLayoutStyled data-testid="main-layout">
        <Folders />
        <MainContainer>
          <ChatList />
          <Chat />
        </MainContainer>
      </MainLayoutStyled>
      <Sidebar />
    </>
  );
};

export default MainLayout;
