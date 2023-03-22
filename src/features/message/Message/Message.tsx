import React, { forwardRef, useState } from 'react';
import {
  MessageContainer,
  MessageContent,
  RecieveTailContainer,
  SentTailContainer
} from './styled';
import { MessageRecieveTail, MessageSentTail } from 'components/icons';
import { useAppSelector } from 'store/hooks';
import { IMessage } from 'types';
import MediaMessage from '../MediaMessage';
import WindowEvent from '../../../helpers/WindowEventWrapper';

interface IMessageProps {
  message: IMessage;
  openMessageMenu: (e: React.MouseEvent, message: IMessage) => void;
}
import MessageTextContent from '../MessageTextContent';
import FastReaction from '../FastReaction';
import messagePhoto from '../../../assets/mockmessagePhoto.jpg';
import { mockMessage } from 'mock/message';
import Menu from 'components/Menu';
import { useAppDispatch } from 'store/hooks';
import { messagesActions } from 'features/chat';
import Modal from 'components/Modal';
import DeletionConfirm from 'components/DeletionConfirm';

const Message = forwardRef<HTMLDivElement, IMessageProps>(({ message, openMessageMenu }, ref) => {
  const { _id } = useAppSelector((state) => state.authentication.user);
  const type = message?.from === _id ? 'sent' : 'recieved';

  console.log('render message');

  return (
    <>
      <MessageContainer type={type} ref={ref} onContextMenu={(e) => openMessageMenu(e, message)}>
        <MessageContent>
          {/* <MediaMessage media={mockMessage.attachment?.media} /> */}
          <MessageTextContent
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
    </>
  );
});

Message.displayName = 'Message';

export default Message;
