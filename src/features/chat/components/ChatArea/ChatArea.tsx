import React from 'react';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import { useAppSelector } from 'store/hooks';
import Message from '../Message/Message';
import { ChatAreaStyled } from './styled';

const ChatArea = () => {
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const messages = useAppSelector((state) => state.chatArea.messages);
  const scrollRef = useScrollToBottom(messages);

  return (
    <ChatAreaStyled>
      {activeChat ? (
        <>
          {messages?.map((msg) => {
            return <Message type="sent" message={msg} ref={scrollRef} key={msg._id} />;
          })}
        </>
      ) : (
        <p>Plese select a chat</p>
      )}
    </ChatAreaStyled>
  );
};

export default ChatArea;
