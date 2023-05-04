import Avatar from 'components/Avatar';
import Button from 'components/ui/Button';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';

const CenterHeader = () => {
  const activeChat = useAppSelector((state) => state.ui.activeChat);
  const dispatch = useAppDispatch();

  return (
    <div className="center-header">
      <Button round onClick={() => dispatch(uiActions.closeCenter())}>
        <span className="material-symbols-outlined">arrow_back</span>
      </Button>
      <div className="activechat-info" onClick={() => dispatch(uiActions.openRight())}>
        <Avatar
          title={activeChat?.title}
          src={activeChat?.avatar}
          styles={{ width: '3.3rem ', height: '3.3rem', fontSize: '2rem' }}
        />
        <div className="d-flex direction-column space-around">
          <div className="activechat-title">{activeChat?.title}</div>
          <div className="activechat-status">last seen 2 hours ago</div>
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
