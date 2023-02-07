import React, { useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from '../../icons';
import Button from '../../shared/Button';
import ChatInput from './ChatInput/ChatInput';
import { ChatControlsContainer } from './styled';

const ChatControls = () => {
  const [val, setVal] = useState('');

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
          <SendIcon width="24px" height="24px" />
        ) : (
          <MicrophoneIcon width="24px" height="24px" />
        )}
      </Button>
    </ChatControlsContainer>
  );
};

export default ChatControls;
