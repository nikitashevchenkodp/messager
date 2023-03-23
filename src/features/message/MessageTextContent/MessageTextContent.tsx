import React, { FC } from 'react';
import { DoubleCheck } from 'components/icons';
import { MessageMeta, MessageText } from './styled';
import { formatTime } from 'helpers/formatMessageTime';
import Reactions from '../Reactions';
import { IReaction } from '../Reactions/Reactions';

interface IMessageTextContent {
  messageId: string;
  chatId: string;
  type: 'sent' | 'recieved';
  text: string;
  meta: {
    createdAt: string;
    delivered: boolean;
    edited: boolean;
  };
  reactions?: IReaction[];
}

const MessageTextContent: FC<IMessageTextContent> = ({
  text,
  meta,
  reactions,
  type,
  messageId,
  chatId
}) => {
  return (
    <MessageText>
      {text}
      <Reactions type={type} reactions={reactions} messageId={messageId} chatId={chatId} />
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
