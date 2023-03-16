import React, { useRef, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer } from './styled';
import Button from 'components/shared/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { sendMessage } from 'services/apiService';

const ChatControls = () => {
  const [val, setVal] = useState('');
  const activeChat = useAppSelector((state) => state.entities.active.activeChat);
  const { _id } = useAppSelector((state) => state.authentication.user);
  const isTiping = useAppSelector((state) => state.online.users[_id]?.typing);
  const typingRef = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useAppDispatch();

  const sendMesage = async (e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e) {
      if (e.key !== 'Enter') {
        return;
      }
    }
    try {
      await sendMessage({
        from: `${_id}`,
        to: activeChat?.user.id || '',
        chatId: activeChat?.chatId || '',
        text: val
      });
      dispatch({
        type: 'sendMessage',
        payload: {
          from: `${_id}`,
          to: activeChat?.user.id || '',
          chatId: activeChat?.chatId || '',
          text: val
        }
      });
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
      dispatch({ type: 'typing', payload: { userId: _id, typing: false } });
    }, 1000);

    if (isTiping) return;
    dispatch({
      type: 'typing',
      payload: { userId: _id, typing: true }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        onKeyDown={handleKeyDown}
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
