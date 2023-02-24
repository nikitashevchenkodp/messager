import React, { useMemo } from 'react';
import { AllChats, Folder } from 'components/icons';
import { foldersActions } from 'features/folders/redux/folders';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices/UI';
import Burger from '../Burger';
import BurgerButton from '../BurgerButton';
import TabsButton from '../TabsButton';

import { FoldersContainer } from './styled';

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
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => clickHandler(e, folder.name)}>
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
      <FoldersContainer>
        <BurgerButton>
          <Burger />
        </BurgerButton>
        <TabsButton
          isActive={activeFolder === 'All chats'}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => clickHandler(e, 'All chats')}>
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
      </FoldersContainer>
    </>
  );
};

export default Folders;