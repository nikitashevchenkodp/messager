import React from 'react';
import Chat from '../components/Chat/Chat';
import ChatList from '../components/ChatList/ChatList';
import Folders from '../components/Folders/Folders';
import Resizer from '../components/Resizer/Resizer';
import './MainLayout.scss';
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
