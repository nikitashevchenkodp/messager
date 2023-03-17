import Portal from 'components/Portal';
import React, { FC, useLayoutEffect, useRef } from 'react';
import { MenuBackground, MenuContainer } from './styled';

interface IMenuProps {
  isOpen: boolean;
  coordinates: {
    x: number;
    y: number;
  };
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const Menu: FC<IMenuProps> = ({ isOpen, coordinates, onClose, children }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.position = 'absolute';
      containerRef.current.style.top = `${coordinates.y}px`;
      containerRef.current.style.left = `${coordinates.x}px`;
    }
  }, [coordinates]);

  return (
    <>
      {isOpen && (
        <Portal>
          <MenuBackground onClick={onClose}>
            <MenuContainer ref={containerRef}>{children}</MenuContainer>
          </MenuBackground>
        </Portal>
      )}
    </>
  );
};

export default Menu;
