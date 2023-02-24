import React, { useContext, useEffect, useState } from 'react';
import { DotsIcon, SearchIcon, SideBarIcon } from 'components/icons';
import { ChatActions, ChatExtraInfo, ChatHeaderInner, ChatHeaderStyled, ChatTitle } from './styled';
import SocketContext from 'contexts/SocketContext';

const ChatHeader = () => {
  const { socket } = useContext(SocketContext).SocketState;
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on('typing', (stat: string) => {
        setStatus(stat);
      });
    }
  }, []);

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
          <ChatTitle>Daria Yefimova</ChatTitle>
          <ChatExtraInfo>
            {status === 'typing' ? (
              <p style={{ color: 'blue' }}>typing...</p>
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
