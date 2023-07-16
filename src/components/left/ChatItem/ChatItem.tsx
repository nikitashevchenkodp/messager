import Avatar from 'components/ui/Avatar';
import Menu from 'components/ui/Menu';
import Ripple from 'components/ui/Ripple';
import useMediaQuery from 'hooks/useMediaQwery';
import { FC, forwardRef, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IChat } from 'store/interfaces';
import { uiActions } from 'store/slices';
import ChatMenu from '../ChatMenu/MessageMenu';
import './ChatItem.scss';

//mock data
// const lastMessage = {
//   from: {
//     id: '222',
//     fullName: 'Daria Shevchenko'
//   },
//   status: 'read',
//   createdAt: '15:08',
//   text: `My name is Nikita. blaasasdasdasdas   asdasdasd a asd asdasdas  das la
//    `
// };

const unreadCount = 0;
const isUser = true;
/////////////////////////////

type MessageStatus = 'delivered' | 'pending' | 'read' | 'fail';
interface IChatItemProps {
  chat: IChat;
}

const ChatItem = forwardRef<any, IChatItemProps>(({ chat }, ref) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const isMdScreen = useMediaQuery('(max-width: 900px)');
  console.log(chat);

  const isActiveChat = useAppSelector((state) => state.ui?.activeChat?.id === chat.id);
  const userStatus = useAppSelector((state) => state.entities.users.statusesById[chat.id]);
  const isChannel = chat?.type === 'channel';
  const isGroup = chat?.type === 'group';
  const lastMessage = useAppSelector((state) => {
    const l = state.entities.messages.byChatId[chat.id]?.messagesIds.length;
    const lastMessageId = state.entities.messages.byChatId[chat.id]?.messagesIds[l - 1];
    const lastMessage = state.entities.messages.byChatId[chat.id]?.byId[lastMessageId];
    return lastMessage;
  });

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
    if (isUser) return foundMsgStatus('delivered');
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
      if (userStatus.typing) return 'typing...';
      return lastMessage.content.text;
    }
    return (
      <>
        <span className="message-author">{lastMessage.from.fullName}: </span>
        {lastMessage.content.text}
      </>
    );
  }, [chat, userStatus, lastMessage]);

  return (
    <>
      <div
        ref={ref}
        data-testid={`chat-${chat.id}`}
        className={`list-item chat-list-item ${isActiveChat ? 'active' : ''}`}
        onClick={handleChatClick}
        onContextMenu={onContextMenu}>
        <div className="avatar-container">
          <Avatar title={chat.title} style={{ height: '50px', width: '50px' }} src={chat.avatar} />
          <div className={`online-status ${userStatus?.online ? 'active' : ''}`}></div>
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
              <span className="last-message-time">
                {new Date(lastMessage.createdAt).toLocaleTimeString().slice(0, 5)}
              </span>
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
});

ChatItem.displayName = 'ChatItem';

export default ChatItem;
