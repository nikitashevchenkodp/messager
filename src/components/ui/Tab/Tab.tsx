import classNames from 'classnames';
import React, { useLayoutEffect, useRef } from 'react';
import { forceReflow } from 'utils/forceReflow';
import './Tab.scss';

interface ITabProps {
  isActive?: boolean;
  prevActive?: number;
  title: string;
  onChange?: (value: number) => void;
  value: number;
}

export const Tab = (props: ITabProps) => {
  const { onChange, isActive = false, value, title, prevActive = 0 } = props;
  const tabRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (tabRef.current && isActive) {
      tabRef.current.classList.add('active');

      const prevElement = tabRef.current.parentElement?.children[prevActive];

      if (prevElement) {
        const prevPlatform = prevElement.querySelector<HTMLElement>('.platform')!;
        const currentPlatform = tabRef.current.querySelector<HTMLElement>('.platform')!;
        const shiftLeft =
          prevPlatform.parentElement!.offsetLeft - currentPlatform.parentElement!.offsetLeft;

        currentPlatform.classList.remove('animate');
        prevPlatform.classList.remove('animate');

        currentPlatform.style.transform = `translate3d(${shiftLeft}px, 0,0)`;
        forceReflow(currentPlatform);
        currentPlatform.classList.add('animate');
        currentPlatform.style.transform = `none`;

        prevElement.classList.remove('active');
        tabRef.current.classList.add('active');
      }
    }
  }, [value, prevActive, isActive]);

  const handleClick = () => {
    onChange?.(value);
  };

  return (
    <div className="Tab" onClick={handleClick} ref={tabRef}>
      {title}
      <div className="badge">5</div>
      <i className="platform" />
    </div>
  );
};
