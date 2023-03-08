import React, { FC } from 'react';
import { ModalWindow, ModalWindowContent } from './styled';

type ModalWindowProps = {
  children?: React.ReactNode;
  active: boolean;
  setActive: (active: boolean) => void;
};

const Modal: FC<ModalWindowProps> = ({ children, active, setActive }) => {
  console.log(active);

  return (
    <ModalWindow active={active} onClick={() => setActive(false)}>
      <ModalWindowContent active={active} onClick={(e) => e.stopPropagation()}>
        {active && children}
      </ModalWindowContent>
    </ModalWindow>
  );
};

export default Modal;
