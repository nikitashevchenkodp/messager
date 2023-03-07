import React from 'react';
import { DotsIcon, SearchIcon, SideBarIcon } from 'components/icons';
import { ChatActions, ChatExtraInfo, ChatHeaderInner, ChatHeaderStyled, ChatTitle } from './styled';
import { useAppSelector } from 'store/hooks';

const ChatHeader = () => {
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const typing = useAppSelector(
    (state) => state.userStatuses.onlineMap[activeChat?.partnerId || '']?.typing
  );
  const online = useAppSelector(
    (state) => state.userStatuses.onlineMap[activeChat?.partnerId || '']
  );

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
              typing ? (
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
