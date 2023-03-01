import { Chat } from 'features/chat';
import { ChatList } from 'features/chat-list';
import { Folders } from 'features/folders';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Container, MainLayoutStyled } from './styled';

const MainLayout = () => {
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: 'CHANEL_ON' });
  }, []);
  return (
    <MainLayoutStyled isHideChatList={isHideChatList}>
      <Folders />
      <ChatList />
      <Chat />
    </MainLayoutStyled>
  );
};

export default MainLayout;
