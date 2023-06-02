import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './UsersList.scss';
const UsersList = ({ isActive }: { isActive: boolean }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isActive}
      classNames="section-scaled"
      unmountOnExit
      mountOnEnter
      timeout={300}>
      <div className="section-scaled users-list" ref={nodeRef}>
        UsersList
      </div>
    </CSSTransition>
  );
};

export default UsersList;
