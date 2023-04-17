import { Chat } from 'blocks/chat';
import { Folders } from 'blocks/folders';
import { Sidebar } from 'blocks/sidebar';

import React from 'react';
import { MainContainer, MainLayoutStyled } from './styled';
import CenterColumn from 'blocks/center/CenterColumn';

const MainLayout = () => {
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
