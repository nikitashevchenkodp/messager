import React, { forwardRef } from 'react';
import {
  MessageAuthor,
  MessageContainer,
  MessageHeader,
  MessageImage,
  MessageMedia,
  MessageMeta,
  MessageText,
  RecieveTailContainer,
  SentTailContainer
} from './styled';
import messagePhoto from '../../../../assets/mockmessagePhoto.jpg';
import { DoubleCheck, MessageRecieveTail, MessageSentTail } from 'components/icons';
import axios from 'axios';
import { useAppSelector } from 'store/hooks';
import { formatTime } from 'helpers/formatMessageTime';

interface Message {
  type: 'recieve' | 'sent';
  message: any;
}

const Message = forwardRef<HTMLDivElement, Message>(({ type, message }, ref) => {
  const { _id } = useAppSelector((state) => state.authentication.user);

  return (
    <MessageContainer
      type={type}
      ref={ref}
      style={{
        alignSelf: message?.from === `${_id}` ? 'flex-end' : 'flex-start',
        borderRadius: message?.from === _id ? '10px 10px 0 10px' : '10px 10px 10px 0'
      }}>
      {/* <MessageHeader>
        <MessageAuthor>{message?.fromFullName}</MessageAuthor>
      </MessageHeader> */}
      {/* <MessageMedia>
        <MessageImage src={messagePhoto} />
      </MessageMedia> */}
      <MessageText>
        {message?.messageText}
        <MessageMeta>
          <span>{formatTime(message?.createdAt)}</span>
          <span>
            <DoubleCheck width="19px" height="19px" />
          </span>
        </MessageMeta>
      </MessageText>
      {message?.from !== _id ? (
        <RecieveTailContainer>
          <MessageRecieveTail />
        </RecieveTailContainer>
      ) : (
        <SentTailContainer>
          <MessageSentTail />
        </SentTailContainer>
      )}
    </MessageContainer>
  );
});

Message.displayName = 'Message';

export default Message;
