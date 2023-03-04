import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uiActions } from '../../store/slices/UI';
import './Resizer.scss';

interface ResizerProps {
  minWidth: number;
  edgeCaseWidth?: number;
  delayInPixels?: number;
}

const Resizer: FC<ResizerProps> = ({ minWidth, edgeCaseWidth = 0, delayInPixels = 0 }) => {
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const resizableElem = useRef<ChildNode | null>(null);
  const resizerRef = useRef<HTMLElement | null>(null);
  const root = useRef<HTMLElement | null>(document.querySelector('#root'));
  const [initWidth, setInitWidth] = useState<number | null>(null);
  const [initiPosition, setInitPosition] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  // const chatListS = useRef<'colapsed' | 'expanded'>(chatListState);

  const resetAll = () => {
    resizableElem.current = null;
    setInitPosition(null);
    setInitWidth(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement;
    resizableElem.current = target.previousSibling;
    if (resizableElem.current) {
      setInitWidth(parseInt(window.getComputedStyle(resizableElem.current as HTMLElement).width));
    }
    setInitPosition(e.clientX);
  };

  const handleMouseUp = () => {
    dispatch(
      uiActions.setChatListWidth(
        parseInt(window.getComputedStyle(resizableElem.current as HTMLElement).width)
      )
    );
    resetAll();
  };

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (!resizerRef.current || !resizableElem.current || !initiPosition || !initWidth) return;
      const resizableElement = resizableElem.current as HTMLElement;
      const newWidth = initWidth + e.clientX - initiPosition;
      // It is some kind of delay. When you are riched minWidth and try increase width more, you will have "delay" during 50px,
      //and when you move more then 50px you will gate edgeCase width.
      if (minWidth - newWidth < delayInPixels && minWidth - newWidth >= 0) return;
      if (newWidth < minWidth && newWidth > initWidth && newWidth - edgeCaseWidth < delayInPixels)
        return;

      //When you finish move, last newWidth always less than zero, we need to avoid this case.
      if (newWidth < 0) return;

      if (newWidth < minWidth) {
        if (newWidth > initWidth) {
          resizableElement.style.width = `${minWidth}px`;
        } else {
          resizableElement.style.width = `${edgeCaseWidth}px`;
        }
      } else {
        resizableElement.style.width = `${newWidth}px`;
      }
    };

    const onMouseUp = () => {
      if (resizableElem.current) {
        dispatch(
          uiActions.setChatListWidth(
            parseInt(window.getComputedStyle(resizableElem.current as HTMLElement).width)
          )
        );
      }
      resetAll();
      root.current?.removeEventListener('mousemove', handleMouseMove);
    };

    root.current?.addEventListener('mousemove', handleMouseMove);
    root.current?.addEventListener('mouseup', onMouseUp);
    root.current?.addEventListener('mouseleave', onMouseUp);

    return () => {
      root.current?.removeEventListener('mousemove', handleMouseMove);
      root.current?.removeEventListener('mouseup', onMouseUp);
      root.current?.removeEventListener('mouseleave', onMouseUp);
    };
  }, [initWidth, initiPosition, chatListState]);

  return (
    <span
      ref={resizerRef}
      className="resizer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}></span>
  );
};

export default Resizer;
