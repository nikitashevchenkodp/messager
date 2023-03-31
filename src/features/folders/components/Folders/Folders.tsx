import React, { useMemo, useState } from 'react';
import { AllChats, Folder } from 'components/icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import Burger from '../Burger';
import BurgerButton from '../BurgerButton';
import { TabsButton } from '../TabsButton';

import { FoldersContainer } from './styled';

import Drawer from 'components/Drawer';
import SideBar from 'components/SideBar';
import Modal from 'components/Modal';
import Contacts from 'components/Contacts';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { uiSettingsActions } from 'store/slices/UI';

const Folders = () => {
  const dispatch = useDispatch();
  const folders = useAppSelector((state) => state.entities.folders.items);
  const activeFolder = useAppSelector((state) => state.entities.active.activeFolder);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>, folderName: string) => {
    e.stopPropagation();
    dispatch(activeEntitiesActions.setActiveFolder(folderName));
    dispatch(uiSettingsActions.showChatList());
  };

  const foldersTabs = useMemo(() => {
    return folders.map((folder) => {
      return (
        <>
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
        </>
      );
    });
  }, [activeFolder]);

  return (
    <>
      <FoldersContainer data-testid="folders">
        <BurgerButton onClick={() => setIsOpen(true)}>
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
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <SideBar
          openMenuItem={() => {
            setIsActive(true);
            setIsOpen(false);
          }}
        />
      </Drawer>
      <Modal active={isActive} onClose={() => setIsActive(false)}>
        <Contacts onClose={() => setIsActive(false)} />
      </Modal>
    </>
  );
};

export default Folders;
