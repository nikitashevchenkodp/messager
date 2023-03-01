import React, { useRef, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer } from './styled';
import Button from 'components/shared/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { sendMessage } from 'services/apiService';
import { chatAreaActions } from 'features/chat/redux/chatArea';

const ChatControls = () => {
  const [val, setVal] = useState('');
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const { _id } = useAppSelector((state) => state.authentication.user);
  const typingRef = useRef<any>();
  const dispatch = useAppDispatch();

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
      dispatch({ type: 'sendMessage', payload: newMessage });
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
      dispatch(chatAreaActions.typing(''));
    }, 500);
    dispatch(chatAreaActions.typing('typing'));
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
