import Portal from 'components/shared/Portal';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const DrawerContainer = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.open ? '1' : '0')};
  pointer-events: ${(props) => (props.open ? 'all' : 'none')};
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 1200;
`;

const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {
  const [drawerWidth, setDrawerWidth] = useState(0);
  const childRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setDrawerWidth(childRef.current?.offsetWidth || 0);
  }, []);

  return (
    <Portal>
      <DrawerContainer open={open} onClick={onClose}>
        <div
          ref={childRef}
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: open ? `translateX(0)` : `translateX(-${drawerWidth}px)`,
            transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
          }}>
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      </DrawerContainer>
    </Portal>
  );
};

export default Drawer;
