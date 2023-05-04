import Avatar from 'components/Avatar';
import Ripple from 'components/ui/Ripple';
import React, { FC, useMemo } from 'react';
import './ChatItem.scss';

const lastMessage = {
  status: 'read',
  createdAt: '15:08',
  text: `My name is Nikita. blaasasdasdasdas   asdasdasd a asd asdasdas  das la
   `
};

const isOnline = true;
const isMuted = false;
const unreadCount = 2;
const isPinned = true;
const isUser = true;

type MessageStatus = 'delivered' | 'pending' | 'read' | 'fail';
interface IChatItemProps {
  onClick: () => void;
}

const ChatItem: FC<IChatItemProps> = ({ onClick }) => {
  const foundMsgStatus = (status: MessageStatus) => {
    switch (status) {
      case 'delivered':
        return <span className="material-symbols-outlined color-green">done</span>;
      case 'pending':
        return <span className="material-symbols-outlined color-grey">schedule</span>;
      case 'read':
        return <span className="material-symbols-outlined done_all color-green">done_all</span>;
      case 'fail':
        return <span className="material-symbols-outlined color-error">schedule</span>;
    }
  };

  const messageStatus = useMemo(() => {
    if (isUser) return foundMsgStatus(lastMessage.status as MessageStatus);
    return null;
  }, []);

  const badge = useMemo(() => {
    if (isPinned && unreadCount > 0) {
      return <div className={`notification-count ${isMuted ? 'muted' : ''}`}>2</div>;
    }
    if (isPinned) {
      return <span className="material-symbols-outlined pinned">push_pin</span>;
    }
  }, []);

  return (
    <div className="chat-list-item" onClick={onClick}>
      <div className="avatar-container">
        <Avatar title="Huk Dmitiy" style={{ height: '50px', width: '50px' }} />
        <div className={`online-status ${isOnline ? '' : 'hide'}`}></div>
      </div>
      <div className="info">
        <div className="d-flex space-between">
          <div className="title">Dmytro Huk</div>
          <div className="last-message-info">
            <div className="last-message-status">{messageStatus}</div>
            <span className="last-message-time">{lastMessage.createdAt}</span>
          </div>
        </div>
        <div className="last-message-row">
          <div className="last-msg-text">{lastMessage.text}</div>
          {badge}
        </div>
      </div>
      <Ripple />
    </div>
  );
};

export default ChatItem;
