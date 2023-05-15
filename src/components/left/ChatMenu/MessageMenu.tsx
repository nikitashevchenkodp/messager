import React, { FC } from 'react';
import { useAppDispatch } from 'store/hooks';
import { IChat } from 'store/interfaces';
import { chatsActions } from 'store/slices';

interface IChatMenuProps {
  chat: IChat;
}

const ChatMenu: FC<IChatMenuProps> = ({ chat }) => {
  const dispatch = useAppDispatch();

  const toogleMute = () => dispatch(chatsActions.toggleMuteChat(chat.id));
  const deleteChat = () => dispatch(chatsActions.deleteChat(chat.id));
  const togglePin = () => dispatch(chatsActions.togglePinChat(chat.id));

  return (
    <div className="menu">
      <div className="menu-item" onClick={toogleMute}>
        <span className="material-symbols-outlined">edit</span>
        Mute
      </div>
      <div className="menu-item" onClick={togglePin}>
        <span className="material-symbols-outlined">push_pin</span>
        Pin
      </div>
      <div className="menu-item color-error" onClick={deleteChat}>
        <span className="material-symbols-outlined">delete</span>
        Delete
      </div>
    </div>
  );
};

export default ChatMenu;
