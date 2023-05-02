import { DoubleCheck } from 'components/icons';
import { formatTime } from 'helpers/formatMessageTime';
import React, { FC } from 'react';
import { MessageMetaStyled } from './styled';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

interface IMessageMeta {
  meta: {
    edited: boolean;
    createdAt: string;
    mStatus?: 'sent' | 'delivered' | 'error';
  };
}

const statusIcon = (mStatus: IMessageMeta['meta']['mStatus']) => {
  switch (mStatus) {
    case 'sent':
      return <QueryBuilderIcon fontSize="inherit" />;
    case 'error':
      return <QueryBuilderIcon fontSize="inherit" color="error" />;
    default:
      return <DoubleCheck width="19px" height="19px" />;
  }
};

const MessageMeta: FC<IMessageMeta> = ({ meta }) => {
  return (
    <MessageMetaStyled data-testid="message-meta">
      {meta.edited && <span data-testid="message-meta-edited">edited</span>}
      <span data-testid="message-meta-time">{formatTime(meta?.createdAt)}</span>
      <span style={{ fontSize: '13px' }}>{statusIcon(meta.mStatus)}</span>
    </MessageMetaStyled>
  );
};

export default MessageMeta;
