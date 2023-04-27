import { DoubleCheck } from 'components/icons';
import { formatTime } from 'helpers/formatMessageTime';
import React, { FC } from 'react';
import { MessageMetaStyled } from './styled';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

interface IMessageMeta {
  meta: {
    edited: boolean;
    createdAt: string;
    status: 'sent' | 'delivered';
  };
}

const MessageMeta: FC<IMessageMeta> = ({ meta }) => {
  return (
    <MessageMetaStyled data-testid="message-meta">
      {meta.edited && <span data-testid="message-meta-edited">edited</span>}
      <span data-testid="message-meta-time">{formatTime(meta?.createdAt)}</span>
      <span style={{ fontSize: '13px' }}>
        {meta.status === 'sent' ? (
          <QueryBuilderIcon fontSize="inherit" />
        ) : (
          <DoubleCheck width="19px" height="19px" />
        )}
      </span>
    </MessageMetaStyled>
  );
};

export default MessageMeta;
