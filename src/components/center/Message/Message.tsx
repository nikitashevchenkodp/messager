import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';
import './Message.scss';
import { ReactComponent as OwnTail } from '../../../assets/message/ownTail.svg';
import { ReactComponent as SentTail } from '../../../assets/message/sentTail.svg';
import Avatar from 'components/ui/Avatar';
import { IMessage } from 'store/interfaces';
import Menu from 'components/ui/Menu';
import MessageMenu from '../MessageMenu/MessageMenu';
import { useAppDispatch } from 'store/hooks';

//TODO: Reactions, edited, msgStatus.
interface IMessageProps {
  message: IMessage;
  isSelectionModeOn: boolean;
  isSelected?: boolean;
  isOwn: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  hasAvatar?: boolean;
  chatType?: 'privat' | 'group' | 'channel';
  selectMessage: () => void;
  onDelete: () => void;
}
const Message = forwardRef<any, IMessageProps>((props, ref) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const {
    message,
    isOwn,
    isSelected,
    isFirstInGroup,
    isLastInGroup,
    chatType,
    isSelectionModeOn,
    selectMessage,
    onDelete
  } = props;

  const hasTail = isLastInGroup || (isFirstInGroup && isLastInGroup);
  const msgClasses = classNames({
    msg: true,
    'msg-selected': isSelected || isOpen,
    'msg-selectionmode-on': isSelectionModeOn,
    hastail: hasTail,
    'msg-own': isOwn,
    'msg-recieved': !isOwn,
    'msg-group-chat': chatType === 'group'
  });

  const withAvatar =
    !isOwn && chatType === 'group' && (isLastInGroup || (isFirstInGroup && isLastInGroup));

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={msgClasses}
        onContextMenu={onContextMenu}
        ref={ref}
        data-testid={`msg-${message?.id}`}
        onClick={() => isSelectionModeOn && selectMessage()}>
        {isSelectionModeOn && (
          <div className={`msg-selection`}>
            <span className={`material-icons ${isSelected ? 'show' : ''}`}>check_circle</span>
          </div>
        )}
        {withAvatar && (
          <div data-testid="msg-avatar">
            <Avatar
              src=""
              title="Dmitiy Huk"
              styles={{ width: '5rem', height: '5rem', position: 'absolute', bottom: 0 }}
            />
          </div>
        )}
        <div className="msg-container">
          <div className="msg-content">
            <div className="msg-media">
              {message.content.attachments?.map((item) => (
                <div key={item} className="msg-media-item">
                  <img src={item} />
                </div>
              ))}
            </div>
            <div className="msg-text">
              {message?.content?.text}
              <span className="msg-meta">
                {message?.edited && <span style={{ marginRight: '3px' }}>edited</span>}
                <span>{new Date(message.createdAt).toLocaleTimeString().slice(0, 5)}</span>
                {isOwn && (
                  <span className="material-symbols-outlined done_all color-green">done_all</span>
                )}
              </span>
            </div>
          </div>
          {hasTail && (
            <div className={`msg-tail`} data-testid="msg-tail">
              {isOwn ? (
                <OwnTail data-testid="msg-tail-own" />
              ) : (
                <SentTail data-testid="msg-tail-sent" />
              )}
            </div>
          )}
        </div>
      </div>

      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cordX={coordinates.x}
        cordY={coordinates.y}>
        <MessageMenu selectMessage={selectMessage} onDelete={onDelete} />
      </Menu>
    </>
  );
});

Message.displayName = 'Message';

export default Message;
