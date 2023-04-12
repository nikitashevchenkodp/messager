import React, { FC } from 'react';
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
import Button from 'components/shared/Button';
import { uiSettingsActions } from 'store/slices/UI';

const ChatHeader = () => {
  const userWithWhomChat = useAppSelector((state) => state.entities.active.activeChat?.user);
  const online = useAppSelector((state) => state.users.statusesById[userWithWhomChat?.id || '']);
  const isChatOpen = useAppSelector((state) => state.ui.uiSettings.isChatOpen);
  const dispatch = useAppDispatch();
  return (
    <ChatHeaderStyled data-testid="chat-header">
      <ChatHeaderInner>
        <BackButton
          style={{ marginRight: '10px' }}
          onClick={() => dispatch(uiSettingsActions.setChatState(false))}>
          <ArrowBackIcon />
        </BackButton>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            flexGrow: 1
          }}>
          <ChatTitle>{userWithWhomChat?.fullName}</ChatTitle>
          <ChatExtraInfo>
            {online ? (
              online.typing ? (
                <p style={{ color: 'blue' }}>typing...</p>
              ) : (
                <p style={{ color: 'green' }}>online</p>
              )
            ) : (
              <>Last seen 4 hours ago</>
            )}
          </ChatExtraInfo>
        </div>
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
