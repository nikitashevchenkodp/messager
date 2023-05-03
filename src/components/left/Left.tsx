import classNames from 'classnames';
import useMediaQuery from 'hooks/useMediaQwery';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import './Left.scss';
const Left = () => {
  const isCenterOpen = useAppSelector((state) => state.ui.isCenterOpen);
  const dispatch = useAppDispatch();

  const leftClasses = classNames({
    'section left': true,
    'section-moved-left-10rem': isCenterOpen
  });

  const isMd = useMediaQuery('(max-width: 900px)');

  return (
    <div
      className={leftClasses}
      aria-expanded={isMd ? !isCenterOpen : undefined}
      data-testid="left">
      <div className="left-header">Left Header</div>
      <button className="opnCntrBnt" onClick={() => dispatch(uiActions.openCenter())}>
        open center
      </button>

      <div className="left-content">
        <div className="chat-list">
          <button className="opnSrchBnt">open search</button>
        </div>
        <div className="search hide">
          <button className="closeSrchBnt">close search</button>
        </div>
      </div>
    </div>
  );
};

export default Left;
