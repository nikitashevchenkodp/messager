import Contacts from 'components/Contacts';
import Drawer from 'components/shared/Drawer';
import Modal from 'components/shared/Modal';
import SideBar from 'components/SideBar';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { sidebarActions } from 'store/slices/sidebar';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isOpenSidebar = useAppSelector((state) => state.ui.sidebar.isOpen);
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
        <Contacts onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default Sidebar;
