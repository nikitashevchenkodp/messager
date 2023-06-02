import classNames from 'classnames';
import useMediaQuery from 'hooks/useMediaQwery';
import { useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LeftContent } from 'store/interfaces';
import { uiActions } from 'store/slices';
import Chats from './Chats';
import './Left.scss';
import LeftHeader from './LeftHeader';
import SearchResults from './SearchResults';
import UsersList from './UsersList';

const Left = () => {
  const isCenterOpen = useAppSelector((state) => state.ui.isCenterOpen);
  const leftContent = useAppSelector((state) => state.ui.leftContent);
  const leftClasses = classNames({
    'section left': true,
    'section-moved-left-10rem': isCenterOpen
  });

  const isMd = useMediaQuery('(max-width: 900px)');
  const renderLeftContent = useMemo(() => {
    return (
      <>
        <Chats isActive={leftContent === LeftContent.ChatList} />
        <UsersList isActive={leftContent === LeftContent.UsersList} />
        <SearchResults isActive={leftContent === LeftContent.Search} />;
      </>
    );
  }, [leftContent]);

  return (
    <div
      className={leftClasses}
      aria-expanded={isMd ? !isCenterOpen : undefined}
      data-testid="left">
      <LeftHeader />
      <div className="left-content">{renderLeftContent}</div>
    </div>
  );
};

export default Left;
