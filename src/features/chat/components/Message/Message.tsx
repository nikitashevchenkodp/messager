import React, { forwardRef } from 'react';
import {
  MessageContainer,
  MessageContent,
  MessageMeta,
  MessageText,
  RecieveTailContainer,
  SentTailContainer
} from './styled';
import { DoubleCheck, MessageRecieveTail, MessageSentTail } from 'components/icons';
import { useAppSelector } from 'store/hooks';
import { formatTime } from 'helpers/formatMessageTime';
import { IMessage } from 'types';
import MediaMessage from '../MediaMessage';
import messagePhoto from '../../../../assets/mockmessagePhoto.jpg';

interface IMessageProps {
  type: 'recieve' | 'sent';
  message: IMessage;
}

const Message = forwardRef<HTMLDivElement, IMessageProps>(({ type, message }, ref) => {
  const { _id } = useAppSelector((state) => state.authentication.user);

  return (
    <MessageContainer
      type={type}
      ref={ref}
      style={{
        alignSelf: message?.from === `${_id}` ? 'flex-end' : 'flex-start',
        borderRadius: message?.from === _id ? '10px 10px 0 10px' : '10px 10px 10px 0'
      }}>
      <MessageContent>
        <MediaMessage
          media={[{ src: messagePhoto }, { src: messagePhoto }, { src: messagePhoto }]}
        />
        <MessageText>
          {/* {message?.text} */}
          1. Роутинг. Я знаю что есть масса способов настроить роутинг, но больше интересует как
          работать с приватными роутами. На скрине видно что у нас есть обертка PrivatRoute, где я
          проверяю юзер в системе или нет. А как быть если у меня много ролей? Городить конструкцию
          switch case? может есть какой-то супер крутой способ настраивать роутинг?asdasdasds
          <MessageMeta>
            <span>{formatTime(message?.createdAt)}</span>
            <span>
              <DoubleCheck width="19px" height="19px" />
            </span>
          </MessageMeta>
        </MessageText>
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
    </MessageContainer>
  );
});

Message.displayName = 'Message';

export default Message;
