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
      <Resizer minWidth={300} edgeCaseWidth={70} />
      <Chat />
    </div>
  );
};

export default MainLayout;
