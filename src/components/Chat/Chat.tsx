import React from 'react';
import { SM_SCREEN_WIDTH } from '../../consts';
import { useAppSelector } from '../../store/hooks';
import ChatArea from './ChatArea/ChatArea';
import ChatControls from './ChatControls/ChatControls';
import ChatHeader from './ChatHeader/ChatHeader';

import { ChatStyled } from './styled';

const Chat = () => {
  const windowWidth = useAppSelector((state) => state.ui.windowWidth);
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);

  return (
    <ChatStyled isHideChatList={isHideChatList} littleScreen={windowWidth < SM_SCREEN_WIDTH}>
      <ChatHeader />
      <ChatArea />
      <ChatControls />
    </ChatStyled>
  );
};

export default Chat;
