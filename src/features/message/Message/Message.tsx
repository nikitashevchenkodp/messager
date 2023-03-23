import React, { forwardRef } from 'react';
import {
  MessageContainer,
  MessageContent,
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
}
import MessageTextContent from '../MessageTextContent';
import FastReaction from '../FastReaction';

const Message = forwardRef<HTMLDivElement, IMessageProps>(({ messageId, openMessageMenu }, ref) => {
  const { _id } = useAppSelector((state) => state.authentication.user);
  const activechatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const message = useAppSelector(
    (state) => state.entities.messages.byChatId[activechatId || ''].messages[messageId]
  );
  const type = message?.from === _id ? 'sent' : 'recieved';
  console.log('render message');

  return (
    <>
      <MessageWrapper
        selected={true}
        onContextMenu={(e) => openMessageMenu(e, message)}
        type={type}>
        <MessageContainer ref={ref} type={type}>
          <MessageContent>
            {/* <MediaMessage media={mockMessage.attachment?.media} /> */}
            <MessageTextContent
              chatId={message.chatId}
              messageId={message._id}
              type={type}
              text={message?.text}
              meta={{
                createdAt: message?.createdAt,
                delivered: false,
                edited: message.edited || false
              }}
              reactions={message.reactions}
            />
          </MessageContent>
          {message?.from !== _id ? (
            <RecieveTailContainer>
              <MessageRecieveTail />
            </RecieveTailContainer>
          ) : (
            <SentTailContainer>
              <MessageSentTail />
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
