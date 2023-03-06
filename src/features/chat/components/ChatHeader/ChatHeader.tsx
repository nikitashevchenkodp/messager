import React from 'react';
import { DotsIcon, SearchIcon, SideBarIcon } from 'components/icons';
import { ChatActions, ChatExtraInfo, ChatHeaderInner, ChatHeaderStyled, ChatTitle } from './styled';
import { useAppSelector } from 'store/hooks';

const ChatHeader = () => {
  const { status, userId } = useAppSelector((state) => state.chatArea.typingStatus);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const onlineUsers = useAppSelector((state) => state.userStatuses.online);
  const online = onlineUsers.includes(activeChat?.partnerId || '');

  const show = userId === activeChat?.partnerId;
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
          <ChatTitle>{activeChat?.partnerFullName}</ChatTitle>
          <ChatExtraInfo>
            {online ? (
              (show && status) === 'typing' ? (
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
