import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { MenuItems } from './styled';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IMenuOptionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

const MenuOptions: FC<IMenuOptionsProps> = ({ onEdit, onDelete, onSelect }) => {
  return (
    <MenuItems>
      <MenuItem onClick={onDelete}>
        <DeleteOutlineIcon />
        Delete
      </MenuItem>
      <MenuItem onClick={onEdit}>
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={() => console.log('reply')}>
        <ReplyIcon />
        Reply
      </MenuItem>
      <MenuItem onClick={onSelect}>
        <CheckCircleOutlineIcon />
        Select
      </MenuItem>
    </MenuItems>
  );
};

export default MenuOptions;
