import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/slices/UI';
import { AllChats, Folder } from '../icons';
import { ButtonBase } from '../shared/styled';
import Burger from './components/Burger';
import BurgerButton from './components/BurgerButton';
import TabsButton from './components/TabsButton';
import './Folders.scss';

const Folders = () => {
  const dispatch = useDispatch();
  const isHideChatList = useSelector((state: any) => state.ui.isHideChatList);
  const windowWidth = useSelector((state: any) => state.ui.windowWidth);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    isHideChatList ? dispatch(uiActions.showChatList()) : dispatch(uiActions.hideChatList());
  };

  return (
    <div className="folders">
      <BurgerButton>
        <Burger />
      </BurgerButton>
      <TabsButton>
        <Folder width="30px" height="30px" stroke="rgb(141, 137, 163)" fill="rgb(141, 137, 163)" />
        Folder
      </TabsButton>
      <TabsButton>
        <AllChats width="30px" height="30px" fill="rgb(141, 137, 163)" />
        All chats
      </TabsButton>
      <ButtonBase onClick={clickHandler}>All chats</ButtonBase>
    </div>
  );
};

export default Folders;
