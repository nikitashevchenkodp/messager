import Message from 'blocks/message/Message/Message';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import styled from 'styled-components';
import { ChatMessagesStyled } from './styled';

const NotMessages = styled.div`
  width: 170px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const ChatMessages = memo(({ openMessageMenu }: any) => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const messagesIds = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId || '']?.messagesIds
  );
  const selectedMessagesIds = useAppSelector(
    (state) => state.entities.active.activeChat.selectedMessagesIds
  );
  const scrollRef = useScrollToBottom(messagesIds);
  const isSelectedModeOn = Object.keys(selectedMessagesIds).length > 0;

  const messages = () => {
    if (!messagesIds?.length) {
      return (
        <NotMessages>
          No messages here yet... Send a message or tap on the greeting below.
        </NotMessages>
      );
    }
    return messagesIds?.map((id: string) => {
      return (
        <Message
          toggleFromSelected={
            isSelectedModeOn
              ? () => dispatch(activeEntitiesActions.toggleItemInSelectedMessagesIds(id))
              : undefined
          }
          selected={Boolean(selectedMessagesIds[id])}
          messageId={id}
          ref={scrollRef}
          key={id}
          openMessageMenu={openMessageMenu}
        />
      );
    });
  };

  return <ChatMessagesStyled data-testid="chat-messages">{messages()}</ChatMessagesStyled>;
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
