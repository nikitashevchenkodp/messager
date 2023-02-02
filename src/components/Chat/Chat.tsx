import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import './Chat.scss';

const Chat = () => {
  const windowWidth = useSelector((state: any) => state.ui.windowWidth);
  const isHideChatList = useSelector((state: any) => state.ui.isHideChatList);
  console.log(isHideChatList);

  const chatListClasses = classNames({
    chat: true,
    'chat--hide': !isHideChatList && windowWidth < 756
  });
  return (
    <div className={chatListClasses}>
      <div className="chat__header">Chat header</div>
      <div className="chat__area">Chat area</div>
      <div className="chat__controls"> Caht controls</div>
    </div>
  );
};

export default Chat;
