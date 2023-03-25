import React, { FC } from 'react';
import { DotsIcon, SearchIcon, SideBarIcon } from 'components/icons';
import { ChatActions, ChatExtraInfo, ChatHeaderInner, ChatHeaderStyled, ChatTitle } from './styled';
import { useAppSelector } from 'store/hooks';

const ChatHeader = () => {
  const userWithWhomChat = useAppSelector((state) => state.entities.active.activeChat?.user);
  const online = useAppSelector((state) => state.users.statusesById[userWithWhomChat?.id || '']);

  return (
    <ChatHeaderStyled>
      <ChatHeaderInner>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
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
