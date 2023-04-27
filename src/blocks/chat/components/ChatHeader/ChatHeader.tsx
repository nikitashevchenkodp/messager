import React from 'react';
import { DotsIcon, SearchIcon, SideBarIcon } from 'components/icons';
import {
  BackButton,
  ChatActions,
  ChatExtraInfo,
  ChatHeaderInner,
  ChatHeaderStyled,
  ChatTitle
} from './styled';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { uiSettingsActions } from 'store/slices/UI';
import TypingIndicator from 'components/TypingIndicator';
import { fomatLastTimeOnline } from 'helpers/formatLastOnlineTime';
import { getActiveChat, getUserStatusById } from 'store/selectors';
import { Avatar } from 'components/shared/Avatar';
import { isUserId } from 'helpers/isUserId';

const ChatHeader = () => {
  const dispatch = useAppDispatch();

  const activeChat = useAppSelector(getActiveChat);
  const userStatus = useAppSelector((state) => getUserStatusById(state, activeChat.id));

  const chatInfo = isUserId(activeChat.id) ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        flexGrow: 1
      }}>
      <ChatTitle>{activeChat?.title}</ChatTitle>
      <ChatExtraInfo>
        {userStatus?.online ? (
          userStatus?.typing ? (
            <TypingIndicator />
          ) : (
            <p style={{ color: 'green' }}>online</p>
          )
        ) : (
          <>{fomatLastTimeOnline(userStatus?.lastTimeOnline)}</>
        )}
      </ChatExtraInfo>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '100%',
        flexGrow: 1
      }}>
      <Avatar
        src={activeChat.avatar}
        fullName={activeChat.title}
        styles={{ width: '40px', height: '40px', fontSize: '20px' }}
      />
      <div>
        <ChatTitle>{activeChat?.title}</ChatTitle>
        <ChatExtraInfo>{activeChat.membersCount} members</ChatExtraInfo>
      </div>
    </div>
  );

  return (
    <ChatHeaderStyled data-testid="chat-header">
      <ChatHeaderInner>
        <BackButton
          style={{ marginRight: '10px' }}
          onClick={() => dispatch(uiSettingsActions.setChatState(false))}>
          <ArrowBackIcon />
        </BackButton>
        {chatInfo}
        <ChatActions>
          <SearchIcon width="24px" height="24px" cursor="pointer" />
          <SideBarIcon width="24px" height="24px" cursor="pointer" />
          <DotsIcon width="24px" height="24px" cursor="pointer" />
        </ChatActions>
      </ChatHeaderInner>
    </ChatHeaderStyled>
  );
};

export default ChatHeader;
