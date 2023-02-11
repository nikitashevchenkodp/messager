import React, { useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer } from './styled';
import Button from 'components/shared/Button';
import axios from 'axios';
import { useAppSelector } from 'store/hooks';

const ChatControls = () => {
  const [val, setVal] = useState('');
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const { _id } = useAppSelector((state) => state.authentication.user);

  const handleClick = async () => {
    const res = await axios.post(`http://localhost:5002/api/messages/send`, {
      from: `${_id}`,
      to: activeChat?.withWhom,
      messageText: val,
      chatId: activeChat?.id || ''
    });

    console.log(res);
  };

  return (
    <ChatControlsContainer>
      <Button>
        <PaperclipIcon width="24px" height="24px" />
      </Button>
      <ChatInput label="Write a message..." value={val} onChange={(e) => setVal(e.target.value)} />
      <Button>
        <EmojiIcon width="24px" height="24px" />
      </Button>
      <Button>
        {val.length ? (
          <SendIcon width="24px" height="24px" onClick={handleClick} />
        ) : (
          <MicrophoneIcon width="24px" height="24px" />
        )}
      </Button>
    </ChatControlsContainer>
  );
};

export default ChatControls;
