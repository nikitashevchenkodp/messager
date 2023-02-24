import React, { useContext, useRef, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer } from './styled';
import Button from 'components/shared/Button';
import axios from 'axios';
import { useAppSelector } from 'store/hooks';
import SocketContext from 'contexts/SocketContext';
import { sendMessage } from 'services/apiService';

const ChatControls = () => {
  const [val, setVal] = useState('');
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const { _id } = useAppSelector((state) => state.authentication.user);
  const { socket } = useContext(SocketContext).SocketState;
  const typingRef = useRef<any>();

  const sendMesage = async (e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e) {
      if (e.key !== 'Enter') {
        return;
      }
    }
    try {
      const { data: newMessage } = await sendMessage({
        from: `${_id}`,
        to: activeChat?.withWhomId || '',
        messageText: val,
        chatId: activeChat?.id || ''
      });
      socket?.emit('sendMessage', newMessage);
      setVal('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleTyping = () => {
    if (typingRef.current) {
      clearInterval(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      socket?.emit('typing', { user: _id, status: '' });
    }, 500);
    socket?.emit('typing', { user: _id, status: 'typing' });
  };
  const handleKetDown = (e: React.KeyboardEvent) => {
    sendMesage(e);
    handleTyping();
  };

  return (
    <ChatControlsContainer>
      <Button>
        <PaperclipIcon width="24px" height="24px" />
      </Button>
      <ChatInput
        label="Write a message..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={handleKetDown}
      />
      <Button>
        <EmojiIcon width="24px" height="24px" />
      </Button>
      <Button>
        {val.length ? (
          <SendIcon width="24px" height="24px" onClick={sendMesage} />
        ) : (
          <MicrophoneIcon width="24px" height="24px" />
        )}
      </Button>
    </ChatControlsContainer>
  );
};

export default ChatControls;
