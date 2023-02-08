import { devNull } from 'os';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { foldersActions } from '../../store/slices/folders';
import { uiActions } from '../../store/slices/UI';
import { AllChats, Folder } from '../icons';
import { ButtonBase } from '../shared/styled';
import Burger from './components/Burger';
import BurgerButton from './components/BurgerButton';
import TabsButton from './components/TabsButton';
import './Folders.scss';

const Folders = () => {
  const dispatch = useDispatch();
  const folders = useAppSelector((state) => state.folders.folders);
  const activeFolder = useAppSelector((state) => state.folders.activeFolder);
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, folderName: string) => {
    e.stopPropagation();
    dispatch(foldersActions.setActiveFolder(folderName));
    dispatch(uiActions.showChatList());
  };

  const foldersTabs = useMemo(() => {
    return folders.map((folder) => {
      return (
        <TabsButton
          isActive={folder.name === activeFolder}
          key={folder.name}
          onClick={(e) => clickHandler(e, folder.name)}>
          <Folder
            width="30px"
            height="30px"
            stroke={folder.name === activeFolder ? 'rgb(94, 181, 247)' : 'rgb(141, 147, 163)'}
            fill={folder.name === activeFolder ? 'rgb(94, 181, 247)' : 'rgb(141, 147, 163)'}
          />
          <span
            style={{
              color: folder.name === activeFolder ? 'rgb(94, 181, 247)' : 'rgb(141, 137, 163)'
            }}>
            {folder.name}
          </span>
        </TabsButton>
      );
    });
  }, [activeFolder]);

  return (
    <>
      <div className="folders">
        <BurgerButton>
          <Burger />
        </BurgerButton>
        <TabsButton
          isActive={activeFolder === 'All chats'}
          onClick={(e) => clickHandler(e, 'All chats')}>
          <AllChats
            width="30px"
            height="30px"
            stroke={activeFolder === 'All chats' ? 'rgb(94, 181, 247)' : 'rgb(141, 147, 163)'}
            fill={activeFolder === 'All chats' ? 'rgb(94, 181, 247)' : 'rgb(141, 147, 163)'}
          />
          <span
            style={{ color: activeFolder === 'All' ? 'rgb(94, 181, 247)' : 'rgb(141, 137, 163)' }}>
            All chats
          </span>
        </TabsButton>
        {foldersTabs}
      </div>
    </>
  );
};

export default Folders;
