import React, { useEffect, useRef, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer, ChatFooter } from './styled';
import Button from 'components/shared/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import EditableMessage from '../EditableMessage';
import { messagesActions } from 'blocks/chat/redux/chat';
import {
  getActiveChat,
  getCurrentUser,
  getEditableMessage,
  getLastMessageFromActiveChat,
  getTypingStatusByUserId
} from 'store/selectors';

const ChatControls = () => {
  const { id: chatId } = useAppSelector(getActiveChat);
  const editableMessage = useAppSelector(getEditableMessage);
  const lastMessage = useAppSelector(getLastMessageFromActiveChat);
  const [val, setVal] = useState('');
  const { _id } = useAppSelector(getCurrentUser);
  const isTiping = useAppSelector((state) => getTypingStatusByUserId(state, _id));
  const typingRef = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    if (!editableMessage) {
      setVal('');
      return;
    }
    setVal(editableMessage?.text);
  }, [editableMessage, chatId]);

  const sendMessage = () => {
    if (editableMessage) {
      dispatch({
        type: 'editMessage',
        payload: {
          messageId: editableMessage._id,
          text: val,
          chatId: editableMessage.chatId
        }
      });
      dispatch(messagesActions.setEditableMessage({ chatId: chatId || '', messageId: '' }));
    } else {
      dispatch({
        type: 'sendMessage',
        payload: {
          from: `${_id}`,
          to: chatId || '',
          chatId: chatId || '',
          text: val
        }
      });
      setVal('');
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

  const setEditableMessage = () => {
    lastMessage &&
      dispatch(
        messagesActions.setEditableMessage({
          chatId: chatId,
          messageId: lastMessage._id
        })
      );
  };
  const clearEditableMessage = () => {
    lastMessage && dispatch(messagesActions.setEditableMessage({ chatId: chatId, messageId: '' }));
  };

  const keyboardEventHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      return sendMessage();
    } else if (e.key === 'ArrowUp') {
      return setEditableMessage();
    } else if (e.key === 'Escape') {
      return clearEditableMessage();
    } else {
      return handleTyping();
    }
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
          onKeyDown={keyboardEventHandler}
        />
        <Button>
          <EmojiIcon width="24px" height="24px" />
        </Button>
        <Button>
          {val.length ? (
            <SendIcon
              width="24px"
              height="24px"
              onClick={sendMessage}
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
