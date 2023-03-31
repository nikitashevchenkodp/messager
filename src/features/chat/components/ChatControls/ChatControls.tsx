import React, { useEffect, useRef, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer, ChatFooter } from './styled';
import Button from 'components/shared/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { sendMessage } from 'services/apiService';
import EditableMessage from '../EditableMessage';
import { messagesActions } from 'features/chat/redux/chat';

const ChatControls = () => {
  const activeChat = useAppSelector((state) => state.entities.active.activeChat);
  const editableMessage = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChat?.chatId || '']?.editableMessage
  );
  const [val, setVal] = useState('');
  const { _id } = useAppSelector((state) => state.authentication.user);
  const isTiping = useAppSelector((state) => state.users.statusesById[_id]?.typing);
  const typingRef = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!editableMessage) {
      setVal('');
      return;
    }
    setVal(editableMessage?.text);
    if (inputRef.current) inputRef.current.focus();
  }, [editableMessage]);

  const sendMesage = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in e) {
      if (e.key !== 'Enter') {
        return;
      }
    }
    try {
      sendMessage();
      if (editableMessage) {
        dispatch({
          type: 'editMessage',
          payload: {
            messageId: editableMessage._id,
            text: val
          }
        });
        dispatch(messagesActions.setEditableMessage({ chatId: activeChat?.chatId || '' }));
      } else {
        dispatch({
          type: 'sendMessage',
          payload: {
            from: `${_id}`,
            to: activeChat.user?.id || '',
            chatId: activeChat?.chatId || '',
            text: val
          }
        });
        setVal('');
      }
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
    <ChatFooter>
      {editableMessage && <EditableMessage message={editableMessage} setInputValue={setVal} />}
      <ChatControlsContainer data-testid="chat-controls">
        <Button>
          <PaperclipIcon width="24px" height="24px" />
          <input type="file" hidden />
        </Button>
        <ChatInput
          data-testid="chat-controls-input"
          ref={inputRef}
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
            <SendIcon
              width="24px"
              height="24px"
              onClick={sendMesage}
              data-testid="chat-controls-send-button"
            />
          ) : (
            <MicrophoneIcon width="24px" height="24px" />
          )}
        </Button>
      </ChatControlsContainer>
    </ChatFooter>
  );
};

export default ChatControls;
