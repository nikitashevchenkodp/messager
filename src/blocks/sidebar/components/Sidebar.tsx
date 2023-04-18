import Contacts from 'components/Contacts';
import Drawer from 'components/shared/Drawer';
import Modal from 'components/shared/Modal';
import SideBar from 'components/SideBar';
import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getIsSidebarOpen } from 'store/selectors';
import { sidebarActions } from 'store/slices/sidebar';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const isOpenSidebar = useAppSelector(getIsSidebarOpen);

  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Drawer open={isOpenSidebar} onClose={() => dispatch(sidebarActions.close())}>
        <SideBar
          openMenuItem={() => {
            dispatch(sidebarActions.close());
            setIsOpen(true);
          }}
        />
      </Drawer>
      <Modal active={isOpen} onClose={() => setIsOpen(false)}>
        <Contacts onClose={onClose} />
      </Modal>
    </>
  );
};

export default Sidebar;
