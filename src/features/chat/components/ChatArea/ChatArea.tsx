import React from 'react';
import Message from '../Message/Message';
import { ChatAreaStyled } from './styled';

const ChatArea = () => {
  return (
    <ChatAreaStyled>
      <Message type="sent" />
      <Message type="recieve" />
      <Message type="sent" />
      <Message type="recieve" />
      <Message type="sent" />
      <Message type="recieve" />
      <Message type="sent" />
      <Message type="recieve" />
      <Message type="sent" />
      <Message type="recieve" />
      <Message type="sent" />
      <Message type="recieve" />
      <Message type="sent" />
    </ChatAreaStyled>
  );
};

export default ChatArea;
