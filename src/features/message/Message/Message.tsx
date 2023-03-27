import React, { forwardRef } from 'react';
import {
  MessageContainer,
  MessageBody,
  MessageWrapper,
  RecieveTailContainer,
  SentTailContainer
} from './styled';
import { MessageRecieveTail, MessageSentTail } from 'components/icons';
import { useAppSelector } from 'store/hooks';
import { IMessage } from 'types';
import MediaMessage from '../MediaMessage';

interface IMessageProps {
  messageId: string;
  openMessageMenu: (e: React.MouseEvent, message: IMessage) => void;
  selected: boolean;
  toggleFromSelected?: () => void;
}
import FastReaction from '../FastReaction';
import { MessageMainContent } from '../MessageTextContent/styled';
import Reactions from '../Reactions';
import styled from 'styled-components';
import MessageMeta from '../MessageMeta';
import { mockMessage } from 'mock/message';

const Text = styled.p``;

const Message = forwardRef<HTMLDivElement, IMessageProps>(
  ({ messageId, openMessageMenu, selected, toggleFromSelected }, ref) => {
    const { _id } = useAppSelector((state) => state.authentication.user);
    const activechatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
    const message = useAppSelector(
      (state) => state.entities.messages.byChatId[activechatId || ''].messages[messageId]
    );
    const type = message?.from === _id ? 'sent' : 'recieved';

    return (
      <>
        <MessageWrapper
          selected={selected}
          onContextMenu={(e) => openMessageMenu(e, message)}
          type={type}
          onClick={toggleFromSelected}>
          <MessageContainer ref={ref} type={type}>
            <MessageBody>
              <MediaMessage media={message.attachment?.media} />
              <MessageMainContent>
                <Text data-testid="message-text">{message.text}</Text>
                <Reactions
                  type={type}
                  reactions={mockMessage.reactions}
                  messageId={message._id}
                  chatId={message.chatId}
                />
                <MessageMeta
                  meta={{
                    edited: message.createdAt,
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
  }
);

Message.displayName = 'Message';

export default Message;
