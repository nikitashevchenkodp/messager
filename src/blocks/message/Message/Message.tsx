import React, { forwardRef } from 'react';
import {
  MessageContainer,
  MessageBody,
  MessageWrapper,
  RecieveTailContainer,
  SentTailContainer,
  MessageMainContent
} from './styled';
import { MessageRecieveTail, MessageSentTail } from 'components/icons';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IMessage } from 'types';
import MediaMessage from '../MediaMessage';

interface IMessageProps {
  messageId: string;
  openMessageMenu: (e: React.MouseEvent, message: IMessage) => void;
}
import FastReaction from '../FastReaction';
import Reactions from '../Reactions';
import styled from 'styled-components';
import MessageMeta from '../MessageMeta';
import { activeEntitiesActions } from 'store/slices/activeEntities';

const Text = styled.p``;

const Message = forwardRef<HTMLDivElement, IMessageProps>(({ messageId, openMessageMenu }, ref) => {
  const { _id } = useAppSelector((state) => state.authentication.user);
  const activechatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const isSelectedModeOn = useAppSelector(
    (state) => Object.values(state.entities.active.activeChat.selectedMessagesIds).length > 0
  );
  const isSelected = useAppSelector((state) =>
    Boolean(state.entities.active.activeChat?.selectedMessagesIds[messageId])
  );
  const dispatch = useAppDispatch();
  const message = useAppSelector(
    (state) => state.entities.messages.byChatId[activechatId || ''].messages[messageId]
  );
  const type = message?.from === _id ? 'sent' : 'recieved';
  console.log('render');

  return (
    <>
      <MessageWrapper
        isSelected={isSelected}
        onContextMenu={(e) => openMessageMenu(e, message)}
        type={type}
        onClick={
          isSelectedModeOn
            ? () => dispatch(activeEntitiesActions.toggleItemInSelectedMessagesIds(messageId))
            : undefined
        }
        data-testid={`message-container-${message._id}`}>
        <MessageContainer ref={ref} type={type}>
          <MessageBody>
            <MediaMessage media={message.attachment?.media} />
            <MessageMainContent>
              <Text data-testid="message-text">{message.text}</Text>
              <Reactions
                type={type}
                reactions={message.reactions}
                messageId={message._id}
                chatId={message.chatId}
              />
              <MessageMeta
                meta={{
                  edited: message.edited,
                  createdAt: message.createdAt
                }}
              />
            </MessageMainContent>
          </MessageBody>
          {message?.from !== _id ? (
            <RecieveTailContainer data-testid="message-tail-recieved">
              <MessageRecieveTail />
            </RecieveTailContainer>
          ) : (
            <SentTailContainer>
              <MessageSentTail data-testid="message-tail-sent" />
            </SentTailContainer>
          )}
          <FastReaction position={message?.from !== _id ? 'right' : 'left'} />
        </MessageContainer>
      </MessageWrapper>
    </>
  );
});

Message.displayName = 'Message';

export default Message;
