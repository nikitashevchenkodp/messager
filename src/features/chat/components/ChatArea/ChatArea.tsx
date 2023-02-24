import axios from 'axios';
import SocketContext from 'contexts/SocketContext';
import { chatAreaActions } from 'features/chat/redux/chatArea';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Message from '../Message/Message';
import { ChatAreaStyled } from './styled';

const ChatArea = () => {
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const messages = useAppSelector((state) => state.chatArea.messages);
  const { _id } = useAppSelector((state) => state.authentication.user);
  const scrollRef = useRef<any>();

  console.log('render chat area');

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
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatAreaStyled>
      {messages?.map((msg) => {
        return <Message type="sent" message={msg} ref={scrollRef} key={msg._id} />;
      })}
    </ChatAreaStyled>
  );
};

export default ChatArea;
