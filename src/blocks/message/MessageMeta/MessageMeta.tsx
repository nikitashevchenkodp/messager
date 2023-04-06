import { DoubleCheck } from 'components/icons';
import { formatTime } from 'helpers/formatMessageTime';
import React, { FC } from 'react';
import { MessageMetaStyled } from './styled';

interface IMessageMeta {
  meta: {
    edited: boolean;
    createdAt: string;
  };
}

const MessageMeta: FC<IMessageMeta> = ({ meta }) => {
  return (
    <MessageMetaStyled data-testid="message-meta">
      {meta.edited && <span data-testid="message-meta-edited">edited</span>}
      <span data-testid="message-meta-time">{formatTime(meta?.createdAt)}</span>
      <span>
        <DoubleCheck width="19px" height="19px" />
      </span>
    </MessageMetaStyled>
  );
};

export default MessageMeta;
