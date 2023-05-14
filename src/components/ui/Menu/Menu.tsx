/* eslint-disable prefer-const */
import React, { FC, useLayoutEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../Portal';
import './Menu.scss';

interface IMenuProps {
  children: React.ReactNode | React.ReactNode[];
  onClose: () => void;
  isOpen: boolean;
  cordX: number;
  cordY: number;
}

const Menu: FC<IMenuProps> = ({ children, onClose, isOpen, cordX, cordY }) => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;

      const coefficientDeflectionX = window.innerWidth - cordX - clientWidth;
      const coefficientDeflectionY = window.innerHeight - cordY - clientHeight;
      //Pixels from left border, and from right border.
      const dangerZone = window.innerWidth - clientWidth;

      //When you click in right bottom corner
      if (coefficientDeflectionX < 0 && coefficientDeflectionY < 0) {
        let coeficcient = 0;
        if (cordX > dangerZone && cordX < window.innerWidth - dangerZone) {
          coeficcient = clientWidth - cordX + 10;
        }
        containerRef.current.style.transformOrigin = `right bottom`;
        containerRef.current.style.left = `${cordX - clientWidth + coeficcient}px`;
        containerRef.current.style.top = `${cordY - clientHeight}px`;
        //When you click in along bottom
      } else if (coefficientDeflectionY < 0) {
        containerRef.current.style.left = `${cordX}px`;
        containerRef.current.style.top = `${cordY - clientHeight}px`;
        containerRef.current.style.transformOrigin = `left bottom`;
        //When you click in along right
      } else if (coefficientDeflectionX < 0) {
        let coeficcient = 0;
        if (cordX > dangerZone && cordX < window.innerWidth - dangerZone) {
          coeficcient = clientWidth - cordX + 10;
        }
        containerRef.current.style.transformOrigin = `right top`;
        containerRef.current.style.left = `${cordX - clientWidth + coeficcient}px`;
        containerRef.current.style.top = `${cordY}px`;

        //Default
      } else {
        containerRef.current.style.top = `${cordY}px`;
        containerRef.current.style.left = `${cordX}px`;
      }
    }
  }, [cordY, cordY]);

  return (
    <>
      <Portal>
        <CSSTransition in={isOpen} nodeRef={ref} timeout={300} classNames="menu" unmountOnExit>
          <div className="menu-bg" onClick={onClose} ref={ref}>
            <div className="menu-content" ref={containerRef} data-testid="context-menu">
              {children}
            </div>
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default Menu;
