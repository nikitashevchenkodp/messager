import React, { FC, memo } from 'react';
import { ModalWindow, ModalWindowContent } from './styled';

type ModalWindowProps = {
  children?: React.ReactNode;
  active: boolean;
  onClose: () => void;
  appearsFrom?: 'bottom' | 'right' | 'left' | 'top';
};

const Modal: FC<ModalWindowProps> = ({ children, active, onClose, appearsFrom }) => {
  return (
    <ModalWindow active={active} onClick={onClose}>
      <ModalWindowContent
        appearsFrom={appearsFrom}
        active={active}
        onClick={(e) => e.stopPropagation()}>
        {active && children}
      </ModalWindowContent>
    </ModalWindow>
  );
};

export default memo(Modal);
