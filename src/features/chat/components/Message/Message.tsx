import React, { FC, useEffect, useState } from 'react';
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

interface Message {
  type: 'recieve' | 'sent';
  message: any;
}

const Message: FC<Message> = ({ type, message }) => {
  const [messageOwner, setMessageOwner] = useState<any>();
  const { _id } = useAppSelector((state) => state.authentication.user);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/api/users/${message.from}`, {
        headers: {
          Authorization: '63e4f9faa0449d3d809f39f6'
        }
      })
      .then((res) => {
        setMessageOwner(res.data);
      });
  }, [message]);

  return (
    <MessageContainer
      type={type}
      style={{
        alignSelf: messageOwner?._id === `${_id}` ? 'flex-end' : 'flex-start',
        borderRadius:
          messageOwner?._id === '63e4f9faa0449d3d809f39f6' ? '10px 10px 0 10px' : '10px 10px 10px 0'
      }}>
      <MessageHeader>
        <MessageAuthor>{messageOwner?.fullName}</MessageAuthor>
      </MessageHeader>
      {/* <MessageMedia>
        <MessageImage src={messagePhoto} />
      </MessageMedia> */}
      <MessageText>
        {message?.messageText}
        <MessageMeta>
          <span>12:34</span>
          <span>
            <DoubleCheck width="19px" height="19px" />
          </span>
        </MessageMeta>
      </MessageText>
      {messageOwner?._id !== '63e4f9faa0449d3d809f39f6' ? (
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
};

export default Message;
