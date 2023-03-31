import { Chat } from 'features/chat';
import { ChatList } from 'features/chat-list';
import { Folders } from 'features/folders';
import useNotifier from 'hooks/useNotifier';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { MainContainer, MainLayoutStyled } from './styled';

const MainLayout = () => {
  const isHideChatList = useAppSelector((state) => state.ui.uiSettings.isHideChatList);
  useNotifier();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: 'innit' });
  }, []);

  return (
    <MainLayoutStyled isHideChatList={isHideChatList} data-testid="main-layout">
      <Folders />
      <MainContainer>
        <ChatList />
        <Chat />
      </MainContainer>
    </MainLayoutStyled>
  );
};

export default MainLayout;
