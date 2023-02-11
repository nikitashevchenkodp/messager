import axios from 'axios';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Message from '../Message/Message';
import { ChatAreaStyled } from './styled';

const ChatArea = () => {
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const messages = useAppSelector((state) => state.chatArea.messages);
  const { _id } = useAppSelector((state) => state.authentication.user);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/api/chats/${activeChat?.id}`, {
        headers: {
          Authorization: `${_id}`
        }
      })
      .then((res) => {
        dispatch(chatAreaActions.setMessages(res.data));
      });
  }, [activeChat]);

  return (
    <ChatAreaStyled>
      {messages?.map((msg) => {
        return <Message type="sent" message={msg} key={msg._id} />;
      })}
    </ChatAreaStyled>
  );
};

export default ChatArea;
