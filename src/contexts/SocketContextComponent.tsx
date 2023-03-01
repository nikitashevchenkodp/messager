/* eslint-disable @typescript-eslint/no-empty-interface */
import { chatAreaActions } from 'features/chat/redux/chatArea';
import React, { PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useSocket } from '../hooks/useSocket';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from './SocketContext';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
  const { children } = props;

  const socket = useSocket('ws://localhost:5002', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false
  });

  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chatArea.messages);
  const chats = useAppSelector((state) => state.chats.chats);
  const activeChatId = useAppSelector((state) => state.chats.activeChat?.id);
  const { _id } = useAppSelector((state) => state.authentication.user);

  useEffect(() => {
    socket.connect();
    SocketDispatch({ type: 'update_socket', payload: socket });
    // Join();
  }, []);

  useEffect(() => {
    // StartListeners();
  }, [messages]);

  const StartListeners = () => {
    /** Messages */
    socket.on('recMsg', (message) => {
      console.log('asdfasdfasd');
      console.log('message', message);
      console.log('activeChat', activeChatId);
      if (message.chatId === activeChatId) {
        console.log('yes');
        dispatch(chatAreaActions.setMessages([...messages, message]));
      }
      console.log('no');
    });

    socket.on('handshakeFromServer', (users: string[]) => {
      console.info('User handshake callback message received');
      SocketDispatch({ type: 'update_users', payload: users });
      SocketDispatch({ type: 'update_uid', payload: _id });
    });

    /** Messages */
    socket.on('user_disconnected', (uid: string) => {
      console.info('User disconnected message received');
      SocketDispatch({ type: 'remove_user', payload: uid });
    });

    /** Connection / reconnection listeners */
    socket.io.on('reconnect', (attempt) => {
      console.info('Reconnected on attempt: ' + attempt);
      Join();
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      alert(
        'We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.'
      );
    });
  };

  const Join = async () => {
    socket.emit('join', { chats, id: _id });
    setLoading(false);
  };

  if (loading) return <p>... loading Socket IO ....</p>;

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
