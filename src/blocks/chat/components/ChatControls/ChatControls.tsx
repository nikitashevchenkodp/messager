import React, { useEffect, useRef, useState } from 'react';
import { EmojiIcon, MicrophoneIcon, PaperclipIcon, SendIcon } from 'components/icons';

import ChatInput from '../ChatInput/ChatInput';
import { ChatControlsContainer, ChatFooter } from './styled';
import Button from 'components/shared/Button';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import EditableMessage from '../EditableMessage';
import { messagesActions } from 'blocks/chat/redux/chat';
import debounce from 'lodash.debounce';

const ChatControls = () => {
  const activeChat = useAppSelector((state) => state.entities.active.activeChat);
  const editableMessage = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChat?.chatId || '']?.editableMessage
  );
  const lastMessage = useAppSelector((state) => {
    const allIds = state.entities?.messages?.byChatId[activeChat.chatId]?.messagesIds;
    if (!allIds?.length) return;
    const lastMessageId =
      state.entities.messages.byChatId[activeChat.chatId]?.messagesIds?.[allIds.length - 1];
    const lastmesage = state.entities.messages.byChatId[activeChat.chatId]?.messages[lastMessageId];
    return lastmesage;
  });
  const [val, setVal] = useState('');
  const { _id } = useAppSelector((state) => state.authentication.user);
  const isTiping = useAppSelector((state) => state.users.statusesById[_id]?.typing);
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
  }, [editableMessage, activeChat]);

  const sendMessage = () => {
    if (editableMessage) {
      dispatch({
        type: 'editMessage',
        payload: {
          messageId: editableMessage._id,
          text: val
        }
      });
      dispatch(
        messagesActions.setEditableMessage({ chatId: activeChat?.chatId || '', messageId: '' })
      );
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
  };

  const handleTyping = () => {
    if (typingRef.current) {
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      dispatch({ type: 'typing', payload: { userId: _id, typing: false } });
    }, 2000);

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
          chatId: activeChat.chatId,
          messageId: lastMessage._id
        })
      );
  };
  const clearEditableMessage = () => {
    lastMessage &&
      dispatch(messagesActions.setEditableMessage({ chatId: activeChat.chatId, messageId: '' }));
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
