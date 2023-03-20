import React from 'react';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import { useAppSelector } from 'store/hooks';
import { ChatAreaStyled } from './styled';
import Message from 'features/message/Message/Message';

const ChatArea = () => {
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const messages = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId || '']?.messages
  );
  const scrollRef = useScrollToBottom(messages);

  return (
    <ChatAreaStyled>
      {messages?.map((msg) => {
        return <Message message={msg} ref={scrollRef} key={msg._id} />;
      })}
    </ChatAreaStyled>
  );
};

export default ChatArea;
