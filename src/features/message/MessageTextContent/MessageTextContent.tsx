import React, { FC } from 'react';
import { DoubleCheck } from 'components/icons';
import { MessageMeta, MessageText } from './styled';
import { formatTime } from 'helpers/formatMessageTime';
import Reactions from '../Reactions';
import { IReaction } from '../Reactions/Reactions';

interface IMessageTextContent {
  type: 'sent' | 'recieved';
  text: string;
  meta: {
    createdAt: string;
    delivered: boolean;
    edited: boolean;
  };
  reactions?: IReaction[];
}

const MessageTextContent: FC<IMessageTextContent> = ({ text, meta, reactions, type }) => {
  return (
    <MessageText>
      {text}
      {/* 1. Роутинг. Я знаю что есть масса способов настроить роутинг, но больше интересует как
          работать с приватными роутами. На скрине видно что у нас есть обертка PrivatRoute, где я
          проверяю юзер в системе или нет. А как быть если у меня много ролей? Городить конструкцию
          switch case? может есть какой-то супер крутой способ настраивать роутинг?asdasdasds */}
      <Reactions type={type} reactions={reactions} />
      <MessageMeta>
        {meta.edited && <span>edited</span>}
        <span>{formatTime(meta?.createdAt)}</span>
        <span>
          <DoubleCheck width="19px" height="19px" />
        </span>
      </MessageMeta>
    </MessageText>
  );
};

export default MessageTextContent;
