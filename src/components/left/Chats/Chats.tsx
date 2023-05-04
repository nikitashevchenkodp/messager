import Avatar from 'components/Avatar';
import Ripple from 'components/ui/Ripple';
import { last } from 'lodash';
import React, { useMemo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { uiActions } from 'store/slices';
import ChatItem from '../ChatItem';
import './Chats.scss';
type MessageStatus = 'delivered' | 'pending' | 'read' | 'fail';

const Chats = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="chat-list">
        {/* <button className="opnCntrBnt" onClick={() => dispatch(uiActions.openCenter())}>
          open center
        </button> */}
        <div className="list">
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
          <ChatItem onClick={() => dispatch(uiActions.openCenter())} />
        </div>
      </div>
    </>
  );
};

export default Chats;
