import React, { FC } from 'react';
import { ModalWindow, ModalWindowContent } from './styled';

type ModalWindowProps = {
  children?: React.ReactNode;
  active: boolean;
  onClose: () => void;
};

const Modal: FC<ModalWindowProps> = ({ children, active, onClose }) => {
  console.log(active);

  return (
    <ModalWindow active={active} onClick={onClose}>
      <ModalWindowContent active={active} onClick={(e) => e.stopPropagation()}>
        {active && children}
      </ModalWindowContent>
    </ModalWindow>
  );
};

export default Modal;
