import { Chat } from 'blocks/chat';
import { ChatList } from 'blocks/center/chat-list';
import { Folders } from 'blocks/folders';
import { Sidebar } from 'blocks/sidebar';

import React, { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

import { MainContainer, MainLayoutStyled } from './styled';
import CenterColumn from 'blocks/center/CenterColumn';

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
          <CenterColumn />
          <Chat />
        </MainContainer>
      </MainLayoutStyled>
      <Sidebar />
    </>
  );
};

export default MainLayout;
