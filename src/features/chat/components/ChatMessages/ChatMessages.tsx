import Message from 'features/message/Message/Message';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { ChatMessagesStyled } from './styled';

const ChatMessages = memo(({ openMessageMenu }: any) => {
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const messagesIds = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId || ''].messagesIds
  );
  console.log('render all messages');

  const scrollRef = useScrollToBottom(messagesIds);

  return (
    <ChatMessagesStyled>
      {messagesIds?.map((id: string) => {
        return (
          <Message messageId={id} ref={scrollRef} key={id} openMessageMenu={openMessageMenu} />
        );
      })}
    </ChatMessagesStyled>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
