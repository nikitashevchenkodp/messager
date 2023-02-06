import React from 'react';
import { SM_SCREEN_WIDTH } from '../../consts';
import { useAppSelector } from '../../store/hooks';
import ChatArea from './ChatArea/ChatArea';
import ChatHeader from './ChatHeader/ChatHeader';

import { ChatControlsStyled, ChatStyled } from './styled';

const Chat = () => {
  const windowWidth = useAppSelector((state) => state.ui.windowWidth);
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);

  return (
    <ChatStyled isHideChatList={isHideChatList} littleScreen={windowWidth < SM_SCREEN_WIDTH}>
      <ChatHeader />
      <ChatArea />
      <ChatControlsStyled> Caht controls</ChatControlsStyled>
    </ChatStyled>
  );
};

export default Chat;
