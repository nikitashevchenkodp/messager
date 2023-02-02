import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import Resizer from '../Resizer/Resizer';
import './ChatList.scss';
const ChatList = () => {
  const windowWidth = useSelector((state: any) => state.ui.windowWidth);
  const isHideChatList = useSelector((state: any) => state.ui.isHideChatList);
  console.log(isHideChatList);

  const chatListClasses = classNames({
    'chat-list__container': true,
    'chat-list__container--hide': isHideChatList
  });

  return (
    <div className={chatListClasses}>
      <div className="chat-list">ChatList</div>
      <Resizer minWidth={300} edgeCaseWidth={70} />
    </div>
  );
};

export default ChatList;
