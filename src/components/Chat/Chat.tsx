import React from 'react';
import { useAppSelector } from '../../store/hooks';

import { ChatAreaStyled, ChatControlsStyled, ChatHeaderStyled, ChatStyled } from './styled';

const Chat = () => {
  const windowWidth = useAppSelector((state) => state.ui.windowWidth);
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);

  return (
    <ChatStyled isHideChatList={isHideChatList} littleScreen={windowWidth < 756}>
      <ChatHeaderStyled>Chat header</ChatHeaderStyled>
      <ChatAreaStyled>Chat area</ChatAreaStyled>
      <ChatControlsStyled> Caht controls</ChatControlsStyled>
    </ChatStyled>
  );
};

export default Chat;
