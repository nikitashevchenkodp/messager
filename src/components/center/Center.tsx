import classNames from 'classnames';
import useMediaQuery from 'hooks/useMediaQwery';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import './Center.scss';

const Center = () => {
  const { isCenterOpen, isRightOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const centerClasses = classNames({
    'section center': true,
    'section-hide-right-md': !isCenterOpen,
    'section-moved-left-10rem-sm': isRightOpen
  });

  const isMd = useMediaQuery('(max-width: 900px)');

  return (
    <div
      className={centerClasses}
      aria-expanded={isMd ? isCenterOpen : undefined}
      data-testid="center">
      <button className="clsCntrBnt" onClick={() => dispatch(uiActions.closeCenter())}>
        close center
      </button>
      <button className="opnRightBnt" onClick={() => dispatch(uiActions.openRight())}>
        open right
      </button>
    </div>
  );
};

export default Center;
