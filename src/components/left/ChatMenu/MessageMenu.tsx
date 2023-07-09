import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IChat } from 'store/interfaces';
import { chatsActions } from 'store/slices';

interface IChatMenuProps {
  chat: IChat;
}

const ChatMenu: FC<IChatMenuProps> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const { isMuted, isPinned } = chat;
  const toogleMute = () => dispatch(chatsActions.toggleMuteChat(chat.id));
  const deleteChat = () => dispatch(chatsActions.deleteChat(chat.id));
  const togglePin = () => dispatch(chatsActions.togglePinChat(chat.id));

  const pinInner = isPinned ? (
    <>
      {' '}
      <span className="material-symbols-outlined">redo</span>
      Unpin
    </>
  ) : (
    <>
      <span className="material-symbols-outlined">push_pin</span>
      Pin
    </>
  );
  const muteInner = isMuted ? (
    <>
      <span className="material-symbols-outlined">volume_up</span> Unmute
    </>
  ) : (
    <>
      <span className="material-symbols-outlined">volume_off</span>
      Mute
    </>
  );

  return (
    <div className="menu">
      <div className="menu-item" onClick={toogleMute}>
        {muteInner}
      </div>
      <div className="menu-item" onClick={togglePin}>
        {pinInner}
      </div>
      <div className="menu-item color-error" onClick={deleteChat}>
        <span className="material-symbols-outlined">delete</span>
        Delete
      </div>
    </div>
  );
};

export default ChatMenu;
