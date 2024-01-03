import { usePrevious } from 'hooks/usePrevious';
import React, { useLayoutEffect, useState } from 'react';

interface IAnimatedListProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AnimatedList = (props: IAnimatedListProps) => {
  const { children } = props;
  const [currentCoords, setCurrentCoords] = useState<Record<string, { x: number; y: number }>>(
    {} as Record<string, { x: number; y: number }>
  );
  const prevCoord = usePrevious(currentCoords);

  useLayoutEffect(() => {
    const coords = {} as Record<string, { x: number; y: number }>;
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        return;
      }

      const key = child.key;
      const node = (child as any).ref.current as HTMLElement;
      if (node && key) {
        const { x, y } = node.getBoundingClientRect();
        coords[key] = { x, y };
      }
    });
    setCurrentCoords(coords);
  }, [children]);

  useLayoutEffect(() => {
    if (prevCoord) {
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
          return;
        }
        const domNode = (child as any).ref.current;
        if (child.key) {
          const firstBox = prevCoord[child.key];
          const lastBox = currentCoords[child.key];

          if (!firstBox || !lastBox) return;
          const changeInX = firstBox.x - lastBox.x;
          const changeInY = firstBox.y - lastBox.y;

          if (changeInX || changeInY) {
            // Before the DOM paints, invert child to old position
            domNode.style.transform = `translate3d(${changeInX}px,${changeInY}px, 0 )`;
            domNode.style.transition = 'transform 0s';
            // eslint-disable-next-line no-unused-expressions
            domNode.clientWidth;
            // After the previous frame, remove
            // the transistion to play the animation
            domNode.style.transform = '';
            domNode.style.transition = 'transform 350ms';
          }
        }
      });
    }
  }, [currentCoords, prevCoord, children]);

  return <>{children}</>;
};
