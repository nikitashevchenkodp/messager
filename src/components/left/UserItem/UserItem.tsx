import Avatar from 'components/ui/Avatar';
import Ripple from 'components/ui/Ripple';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices';
import { fomatLastTimeOnline } from 'utils/formatLastOnlineTime';
import './UserItem.scss';

interface IUserItemProps {
  userId: string;
}

const UserItem: FC<IUserItemProps> = (props) => {
  const { userId } = props;
  const { user, userStatus } = useAppSelector((state) => ({
    user: state.entities.users.usersById[userId],
    userStatus: state.entities.users.statusesById[userId]
  }));

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(uiActions.setActiveChat({ avatar: user.avatar, title: user.fullName, id: user.id }));
    dispatch(uiActions.openCenter());
  };

  return (
    <div className="list-item user-item" onClick={handleClick}>
      <div className="avatar-container">
        <Avatar title={user.fullName} style={{ height: '50px', width: '50px' }} src={user.avatar} />
      </div>
      <div className="user-item__info">
        <p className="user-item__title">{user.fullName}</p>
        <p className="user-item__online">
          {userStatus.online ? 'online' : fomatLastTimeOnline(userStatus.lastTimeOnline)}
        </p>
      </div>
      <Ripple />
    </div>
  );
};

export default UserItem;
