import classNames from 'classnames';
import useMediaQuery from 'hooks/useMediaQwery';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import Chats from './Chats';
import './Left.scss';
import LeftHeader from './LeftHeader';

const Left = () => {
  const isCenterOpen = useAppSelector((state) => state.ui.isCenterOpen);
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
      <LeftHeader />
      <div className="left-content">
        <Chats />
        {/* <div className="search hide">
          <button className="closeSrchBnt">close search</button>
        </div> */}
      </div>
    </div>
  );
};

export default Left;
