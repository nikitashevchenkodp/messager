import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/slices/UI';
import { AllChats, Folder } from '../icons';
import './Folders.scss';

const Folders = () => {
  const dispatch = useDispatch();
  const isHideChatList = useSelector((state: any) => state.ui.isHideChatList);
  const windowWidth = useSelector((state: any) => state.ui.windowWidth);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    windowWidth < 756
      ? isHideChatList
        ? dispatch(uiActions.showChatList())
        : dispatch(uiActions.hideChatList())
      : null;
  };

  return (
    <div className="folders">
      <button className="btn btn--burger">
        <span className="burger"></span>
      </button>
      <button className="btn btn--icon">
        <Folder width="30px" height="30px" stroke="rgb(141, 137, 163)" fill="rgb(141, 137, 163)" />
        Folder
      </button>
      <button className="btn btn--icon">
        <AllChats width="30px" height="30px" fill="rgb(141, 137, 163)" />
        All chats
      </button>
      <button onClick={clickHandler}>All chats</button>
    </div>
  );
};

export default Folders;
