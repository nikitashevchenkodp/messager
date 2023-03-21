import Message from 'features/message/Message/Message';
import React, { memo } from 'react';
import { ChatMessagesStyled } from './styled';

const ChatMessages = memo(({ messages, scrollRef, openMessageMenu }: any) => {
  return (
    <ChatMessagesStyled>
      {messages?.map((msg: any) => {
        return (
          <Message message={msg} ref={scrollRef} key={msg._id} openMessageMenu={openMessageMenu} />
        );
      })}
    </ChatMessagesStyled>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
