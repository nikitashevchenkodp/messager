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
import { getActiveChatUser, getUserStatusById } from 'store/selectors';

const ChatHeader = () => {
  const dispatch = useAppDispatch();

  const userWithWhomChat = useAppSelector(getActiveChatUser);
  const userStatus = useAppSelector((state) => getUserStatusById(state, userWithWhomChat!.id));

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
