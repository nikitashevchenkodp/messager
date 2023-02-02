import React from 'react';
import Chat from '../components/Chat/Chat';
import ChatList from '../components/ChatList/ChatList';
import Folders from '../components/Folders/Folders';
import Resizer from '../components/Resizer/Resizer';
import './MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Folders />
      <ChatList />
      <Chat />
    </div>
  );
};

export default MainLayout;
