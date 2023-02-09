import React, { FC } from 'react';
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

interface Message {
  type: 'recieve' | 'sent';
}

const Message: FC<Message> = ({ type }) => {
  return (
    <MessageContainer type={type}>
      <MessageHeader>
        <MessageAuthor>Shevchenko Nikita</MessageAuthor>
      </MessageHeader>
      {/* <MessageMedia>
        <MessageImage src={messagePhoto} />
      </MessageMedia> */}
      <MessageText>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis recusandae
        reprehenderit ipsum molestiae excepturi tempora culpa consequuntur ea cupiditate?
        <MessageMeta>
          <span>12:34</span>
          <span>
            <DoubleCheck width="19px" height="19px" />
          </span>
        </MessageMeta>
      </MessageText>
      {type === 'recieve' ? (
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
