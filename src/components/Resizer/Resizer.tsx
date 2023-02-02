import React, { FC, useEffect, useRef, useState } from 'react';
import './Resizer.scss';

interface ResizerProps {
  minWidth: number;
  edgeCaseWidth?: number;
  withDelay?: boolean;
}

const Resizer: FC<ResizerProps> = ({ minWidth, edgeCaseWidth, withDelay = true }) => {
  console.log('render');

  const resizableElem = useRef<ChildNode | null>(null);
  const resizerRef = useRef<HTMLElement | null>(null);
  const root = useRef<HTMLElement | null>(document.querySelector('#root'));
  const [initWidth, setInitWidth] = useState<number | null>(null);
  const [initiPosition, setInitPosition] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log('mouse down');

    const target = e.target as HTMLElement;
    resizableElem.current = target.previousSibling;
    if (resizableElem.current) {
      setInitWidth(parseInt(window.getComputedStyle(resizableElem.current as HTMLElement).width));
    }
    setInitPosition(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log('mouse up');
    resizableElem.current = null;
    setInitPosition(null);
    setInitWidth(null);
  };

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (!resizerRef.current || !resizableElem.current || !initiPosition || !initWidth) return;
      const newWidth = initWidth + e.clientX - initiPosition;
      if (minWidth - newWidth < 50 && minWidth - newWidth >= 0) return;
      if (newWidth < 0) return;
      if (newWidth < minWidth) {
        console.log('this case');
        if (!edgeCaseWidth) return;
        if (newWidth > initWidth) {
          (resizableElem.current as HTMLElement).style.width = `${minWidth}px`;
        } else {
          (resizableElem.current as HTMLElement).style.width = `${edgeCaseWidth}px`;
        }
      } else {
        (resizableElem.current as HTMLElement).style.width = `${
          initWidth + e.clientX - initiPosition
        }px`;
      }
    };

    const onMouseUp = () => {
      console.log('work');
      if (root.current) root.current.removeEventListener('mousemove', handleMouseMove);
    };
    if (root.current) {
      root.current.addEventListener('mousemove', handleMouseMove);
      root.current.addEventListener('mouseup', onMouseUp);
      root.current.addEventListener('mouseleave', onMouseUp);
    }
    return () => {
      if (root.current) {
        root.current.removeEventListener('mousemove', handleMouseMove);
        root.current.removeEventListener('mouseup', onMouseUp);
        root.current.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, [initWidth, initiPosition]);

  return (
    <span
      ref={resizerRef}
      className="resizer"
      // draggable={true}
      onMouseDown={handleClick}
      // onDrag={handleMouseMove}
      onMouseUp={handleMouseUp}></span>
  );
};

export default Resizer;
