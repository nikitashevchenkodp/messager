import Portal from 'components/Portal';
import React, { FC, memo, useEffect, useLayoutEffect, useRef } from 'react';
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
      const { width, height } = containerRef.current.getBoundingClientRect();
      const { x, y } = coordinates;

      const coefficientDeflectionX = window.innerWidth - x - width;
      const coefficientDeflectionY = window.innerHeight - y - height;

      if (coefficientDeflectionX < 0 && coefficientDeflectionY < 0) {
        containerRef.current.style.left = `${coordinates.x + coefficientDeflectionX - 10}px`;
        containerRef.current.style.top = `${coordinates.y + coefficientDeflectionY - 10}px`;
      } else if (coefficientDeflectionY < 0) {
        containerRef.current.style.left = `${coordinates.x}px`;
        containerRef.current.style.top = `${coordinates.y + coefficientDeflectionY - 10}px`;
      } else if (coefficientDeflectionX < 0) {
        containerRef.current.style.left = `${coordinates.x + coefficientDeflectionX - 10}px`;
        containerRef.current.style.top = `${coordinates.y}px`;
      } else {
        containerRef.current.style.top = `${coordinates.y}px`;
        containerRef.current.style.left = `${coordinates.x}px`;
      }
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

export default memo(Menu);
