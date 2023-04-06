import React, { ReactElement, useState } from 'react';
import Avatar from 'components/shared/Avatar';
import Divider from 'components/shared/Divider';
import { useAppSelector } from 'store/hooks';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import {
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemTitle,
  SidebarContainer,
  SidebarHeader,
  UserFullname
} from './styled';
import { InsertEmoticonSharp } from '@mui/icons-material';
import Modal from 'components/shared/Modal';

interface IMenuItem {
  Icon: ReactElement;
  title: string;
  iconContainerColor: string;
}

const menuItems: IMenuItem[] = [
  {
    Icon: <PersonIcon color="inherit" fontSize="inherit" />,
    title: 'Contacts',
    iconContainerColor: 'rgb(240, 105, 100)'
  },
  {
    Icon: <SettingsIcon color="inherit" fontSize="inherit" />,
    title: 'Settings',
    iconContainerColor: 'rgb(181, 128,226)'
  }
];

const SideBar = ({ openMenuItem }: any) => {
  const user = useAppSelector((state) => state.authentication.user);

  const items = menuItems.map((menuItem) => {
    const { Icon, iconContainerColor, title } = menuItem;
    return (
      <MenuItem
        key={title}
        onClick={() => {
          openMenuItem();
        }}>
        <MenuIcon color={iconContainerColor}>{Icon}</MenuIcon>
        <MenuItemTitle>{title}</MenuItemTitle>
      </MenuItem>
    );
  });

  return (
    <SidebarContainer data-testid="sidebar-menu">
      <SidebarHeader>
        <div style={{ marginBottom: '20px' }}>
          <Avatar src={user.avatar} fullName={user.fullName} />
        </div>
        <UserFullname>{user.fullName}</UserFullname>
      </SidebarHeader>
      <Divider />
      <Menu>{items}</Menu>
    </SidebarContainer>
  );
};

export default SideBar;
