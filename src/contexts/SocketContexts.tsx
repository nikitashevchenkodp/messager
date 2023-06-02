import { useSocket } from 'hooks/useSocket';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect } from 'react';
import { serverLink } from 'services/config';
import { Socket } from 'socket.io-client';
import { useAppSelector } from 'store/hooks';
interface ContextDataType {
  socket: Socket;
}

const SocketContext = createContext<ContextDataType | null>(null);

enum SocketEvents {}

export const SocketProvider: FC<PropsWithChildren> = (props) => {
  const userId = useAppSelector((state) => state.user.user._id);

  const socket = useSocket(serverLink!, {
    ackTimeout: 10000,
    reconnectionDelay: 500,
    transports: ['websocket', 'polling'],
    autoConnect: false,
    query: {
      id: userId
    }
  });

  const startListeners = () => {};

  useEffect(() => {
    socket.connect();
  }, []);

  return <SocketContext.Provider value={{ socket }}>{props.children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
  const data = useContext(SocketContext);
  if (!data) {
    throw Error('Cannot use "useSocketContext" outside the "SocketProvider"');
  }
  return data;
};
