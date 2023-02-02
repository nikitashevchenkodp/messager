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
  const [initWidth, setInitWidth] = useState<number | null>(null);
  const [initiPosition, setInitPosition] = useState<number | null>(null);
  const [isDecrese, setIsDecrease] = useState(false);

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
        if (!edgeCaseWidth) return;
        (resizableElem.current as HTMLElement).style.width = `${edgeCaseWidth}px`;
      } else {
        (resizableElem.current as HTMLElement).style.width = `${
          initWidth + e.clientX - initiPosition
        }px`;
      }
    };

    const onMouseUp = () => {
      console.log('work');
      document.querySelector('#root')!.removeEventListener('mousemove', handleMouseMove);
    };

    const secondListener = () => {
      console.log('secondListener');
    };

    document.querySelector('#root')!.addEventListener('mousemove', handleMouseMove);
    document.querySelector('#root')!.addEventListener('mousemove', secondListener);
    document.querySelector('#root')!.addEventListener('mouseup', onMouseUp);
    document.querySelector('#root')!.addEventListener('mouseleave', onMouseUp);
    return () => {
      document.querySelector('#root')!.removeEventListener('mousemove', handleMouseMove);
      document.querySelector('#root')!.removeEventListener('mouseup', onMouseUp);
      document.querySelector('#root')!.removeEventListener('mouseleave', onMouseUp);
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
