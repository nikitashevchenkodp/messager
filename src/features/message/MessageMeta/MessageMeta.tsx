import { DoubleCheck } from 'components/icons';
import { formatTime } from 'helpers/formatMessageTime';
import React from 'react';
import { MessageMetaStyled } from './styled';

const MessageMeta = ({ meta }: any) => {
  return (
    <MessageMetaStyled data-testid="message-meta">
      {meta.edited && <span>edited</span>}
      <span>{formatTime(meta?.createdAt)}</span>
      <span>
        <DoubleCheck width="19px" height="19px" />
      </span>
    </MessageMetaStyled>
  );
};

export default MessageMeta;
