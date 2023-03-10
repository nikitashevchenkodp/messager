import React from 'react';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import { useAppSelector } from 'store/hooks';
import Message from '../Message/Message';
import { ChatAreaStyled } from './styled';

const ChatArea = () => {
  const activeUser = useAppSelector((state) => state.chats.activeUser);
  const messages = useAppSelector((state) => state.chatArea.messages);
  const scrollRef = useScrollToBottom(messages);

  return (
    <ChatAreaStyled>
      {messages?.map((msg) => {
        return <Message type="sent" message={msg} ref={scrollRef} key={msg._id} />;
      })}
    </ChatAreaStyled>
  );
};

export default ChatArea;
