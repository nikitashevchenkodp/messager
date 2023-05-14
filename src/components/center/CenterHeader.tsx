import Avatar from 'components/ui/Avatar';
import Button from 'components/ui/Button';
import useMediaQuery from 'hooks/useMediaQwery';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';

const CenterHeader = () => {
  const activeChat = useAppSelector((state) => state.ui.activeChat);
  const isUserChat = activeChat?.type === 'privat';
  const dispatch = useAppDispatch();
  const isMd = useMediaQuery('(max-width: 900px)');

  const status = useMemo(() => {
    if (isUserChat) {
      return <div className="activechat-status">last seen 2 hours ago</div>;
    }
    return <div className="activechat-status">{activeChat?.membersCount} members</div>;
  }, [activeChat]);

  return (
    <div className="center-header">
      {isMd && (
        <Button round onClick={() => dispatch(uiActions.closeCenter())}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
      )}
      <div className="activechat-info" onClick={() => dispatch(uiActions.openRight())}>
        <Avatar
          title={activeChat?.title}
          src={activeChat?.avatar}
          styles={{ width: '3.3rem ', height: '3.3rem', fontSize: '2rem' }}
        />
        <div className="d-flex direction-column space-around">
          <div className="activechat-title">{activeChat?.title}</div>
          {status}
        </div>
      </div>
      <div className="activechat-tools">
        <Button round>
          <span className="material-symbols-outlined">search</span>
        </Button>
        <Button round>
          <span className="material-symbols-outlined">call</span>
        </Button>
        <Button round>
          <span className="material-symbols-outlined">more_vert</span>
        </Button>
      </div>
    </div>
  );
};

export default CenterHeader;
