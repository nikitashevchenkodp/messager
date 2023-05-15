import Avatar from 'components/ui/Avatar';
import Menu from 'components/ui/Menu';
import Ripple from 'components/ui/Ripple';
import useMediaQuery from 'hooks/useMediaQwery';
import { FC, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import ChatMenu from '../ChatMenu/MessageMenu';
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

  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

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
  }, [chat]);

  const badge = useMemo(() => {
    if (chat?.unreadCount && chat?.unreadCount > 0) {
      return (
        <div
          data-testid="notification-badge"
          className={`notification-count ${chat.isMuted ? 'muted' : ''}`}>
          2
        </div>
      );
    }
    if (chat.isPinned) {
      return (
        <span data-testid="isPinned-icon" className="material-symbols-outlined pinned">
          push_pin
        </span>
      );
    }
  }, [chat]);

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
  }, [chat]);

  return (
    <>
      <div
        data-testid={`chat-${chatId}`}
        className={`chat-list-item ${isActiveChat ? 'active' : ''}`}
        onClick={handleChatClick}
        onContextMenu={onContextMenu}>
        <div className="avatar-container">
          <Avatar title={chat.title} style={{ height: '50px', width: '50px' }} />
          <div className={`online-status ${isOnline ? 'active' : ''}`}></div>
        </div>
        <div className="info">
          <div className="d-flex">
            {isChannel && (
              <span data-testid="isChanel-icon" className="material-symbols-outlined">
                campaign
              </span>
            )}
            <div className="d-flex title grow-1 items-center">
              {chat.title}
              {chat.isMuted && (
                <span data-testid="isMuted-icon" className="material-symbols-outlined color-gray">
                  volume_off
                </span>
              )}
            </div>
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
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cordX={coordinates.x}
        cordY={coordinates.y}>
        <ChatMenu chat={chat} />
      </Menu>
    </>
  );
};

export default ChatItem;
