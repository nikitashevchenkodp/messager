import Avatar from 'components/ui/Avatar';
import Ripple from 'components/ui/Ripple';
import useMediaQuery from 'hooks/useMediaQwery';
import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import './ChatItem.scss';

//mock data
const lastMessage = {
  from: {
    id: '222',
    fullName: 'Daria Shevchenko'
  },
  status: 'read',
  createdAt: '15:08',
  text: `My name is Nikita. blaasasdasdasdas   asdasdasd a asd asdasdas  das la
   `
};

const isOnline = false;
const unreadCount = 0;
const isUser = true;
/////////////////////////////

type MessageStatus = 'delivered' | 'pending' | 'read' | 'fail';
interface IChatItemProps {
  chatId: string;
}

const ChatItem: FC<IChatItemProps> = ({ chatId }) => {
  const dispatch = useAppDispatch();

  const isMdScreen = useMediaQuery('(max-width: 900px)');
  const chat = useAppSelector((state) => state.entities.chats.byId[chatId]);
  const isActiveChat = useAppSelector((state) => state.ui?.activeChat?.id === chatId);
  const isChannel = chat.type === 'channel';
  const isGroup = chat.type === 'group';

  const handleChatClick = () => {
    dispatch(uiActions.setActiveChat(chat));
    isMdScreen && dispatch(uiActions.openCenter());
  };

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
    if (unreadCount > 0) {
      return <div className={`notification-count ${chat.isMuted ? 'muted' : ''}`}>2</div>;
    }
    if (chat.isPinned) {
      return <span className="material-symbols-outlined pinned">push_pin</span>;
    }
  }, []);

  const lastMessageText = useMemo<string | JSX.Element>(() => {
    if (!isGroup) {
      return lastMessage.text;
    }
    return (
      <>
        <span className="message-author">{lastMessage.from.fullName}: </span>
        {lastMessage.text}
      </>
    );
  }, []);

  return (
    <div className={`chat-list-item ${isActiveChat ? 'active' : ''}`} onClick={handleChatClick}>
      <div className="avatar-container">
        <Avatar title={chat.title} style={{ height: '50px', width: '50px' }} />
        <div className={`online-status ${isOnline ? 'active' : ''}`}></div>
      </div>
      <div className="info">
        <div className="d-flex">
          {isChannel && <span className="material-symbols-outlined">campaign</span>}
          <div className="title grow-1">{chat.title}</div>
          <div className="last-message-info">
            <div className="last-message-status">{messageStatus}</div>
            <span className="last-message-time">{lastMessage.createdAt}</span>
          </div>
        </div>
        <div className="last-message-row">
          <div className="last-msg-text">{lastMessageText}</div>
          {badge}
        </div>
      </div>
      <Ripple />
    </div>
  );
};

export default ChatItem;
