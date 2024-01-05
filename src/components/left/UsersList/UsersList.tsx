import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from 'store/hooks';
import UserItem from '../UserItem';
import './UsersList.scss';
const UsersList = ({ isActive }: { isActive: boolean }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const usersIds = useAppSelector((state) => state.entities.users.userIds);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isActive}
      classNames="section-scaled"
      unmountOnExit
      mountOnEnter
      timeout={300}>
      <div className="section-scaled users-list" ref={nodeRef}>
        <h3 className="left-content-title">Users</h3>
        <div className="list">
          {usersIds.map((userId) => {
            return <UserItem key={userId} userId={userId} />;
          })}
        </div>
      </div>
    </CSSTransition>
  );
};

export default UsersList;
