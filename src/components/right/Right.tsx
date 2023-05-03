import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import './Right.scss';

const Right = () => {
  const isRightOpen = useAppSelector((state) => state.ui.isRightOpen);

  const dispatch = useDispatch();

  const rightClasses = classNames({
    right: true,
    'section-hide-right': !isRightOpen
  });
  return (
    <div className={rightClasses} aria-expanded={isRightOpen} data-testid="right">
      <button className="clsRightBnt" onClick={() => dispatch(uiActions.closeRight())}>
        close right
      </button>
    </div>
  );
};

export default Right;
