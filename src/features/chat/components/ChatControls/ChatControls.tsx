import React, { useContext, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer } from './styled';
import Button from 'components/shared/Button';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import SocketContext from 'contexts/SocketContext';

const ChatControls = () => {
  const [val, setVal] = useState('');
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const { _id } = useAppSelector((state) => state.authentication.user);
  const { socket, uid, users } = useContext(SocketContext).SocketState;

  const sendMesage = async (e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e) {
      if (e.key !== 'Enter') {
        return;
      }
    }
    try {
      const { data: newMessage } = await axios.post(`http://localhost:5002/api/messages/send`, {
        from: `${_id}`,
        to: activeChat?.withWhomId,
        messageText: val,
        chatId: activeChat?.id || ''
      });
      socket?.emit('sendMessage', newMessage);
      setVal('');
    } catch (error) {
      console.log(error);
    }
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
        onKeyDown={sendMesage}
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
