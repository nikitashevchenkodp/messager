import Avatar from 'components/ui/Avatar';
import Button from 'components/ui/Button';
import useMediaQuery from 'hooks/useMediaQwery';
import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IChat } from 'store/interfaces';
import { uiActions } from 'store/slices';
import { fomatLastTimeOnline } from 'utils/formatLastOnlineTime';

interface ICenterHeaderProps {
  activeChat: IChat;
}

const CenterHeader: FC<ICenterHeaderProps> = ({ activeChat }) => {
  const isUserChat = activeChat?.type === 'privat' || !activeChat.id.startsWith('-');
  const userStatus = useAppSelector((state) => state.entities.users.statusesById[activeChat.id]);
  const dispatch = useAppDispatch();
  const isMd = useMediaQuery('(max-width: 700px)');
  const status = () => {
    if (isUserChat) {
      if (userStatus.typing) return <div className="activechat-status">typing...</div>;
      return (
        <div className="activechat-status">
          {userStatus.online ? 'online' : fomatLastTimeOnline(userStatus.lastTimeOnline)}
        </div>
      );
    }
    return <div className="activechat-status">{activeChat?.membersCount} members</div>;
  };

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
          {status()}
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

export default memo(CenterHeader);
