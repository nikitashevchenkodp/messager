import { useSocket } from 'hooks/useSocket';
import throttle from 'lodash.throttle';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { getChatById } from 'services/chats';
import { serverLink } from 'services/config';
import { Socket } from 'socket.io-client';
import { AppDispatch, RootState } from 'store';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IMessage } from 'store/interfaces';
import { chatsActions, messagesActions, usersActions } from 'store/slices';
import audio from 'assets/iPhone - Message Notification.mp3';
import { audioService } from 'services/audioServise';
interface ContextDataType {
  socket: Socket;
  sendMessage: (msg: IMessage) => void;
  typing: (chatId: string, typing: boolean) => void;
}

const SocketContext = createContext<ContextDataType | null>(null);

enum SocketEvents {
  SendMessage = 'new-message',
  RecieveMessage = 'responseMessage',
  Typing = 'typing',
  Disconnect = 'disconnect',
  DeleteMessage = 'deleteMessage',
  EditMessage = 'editMessage',
  AddReation = 'addReaction',
  DeleteReaction = 'deleteReaction',
  ConnectToNewChat = 'connectToNewChat',
  Reconnect = 'reconnect',
  ReconnectFailed = 'reconnect_failed',
  OnlineList = 'onlineUsers',
  UserConnected = 'newUserConnected',
  UserDisconneted = 'userDisconnected'
}

interface SuccessRespMessagerecieved {
  status: 'success';
  message: IMessage;
}

interface FailureRespMessageRecieved {
  status: 'false';
  errorMessage: string;
}

type SendMessageResp = SuccessRespMessagerecieved | FailureRespMessageRecieved;

const newMessageThunk =
  (message: IMessage) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const chat = getState().entities.chats.byId[message.chatId];
      if (chat) {
        dispatch(messagesActions.addNewMessage(message));
        dispatch(chatsActions.changeOrderChat(message.chatId));

        return;
      }
      const newChat = await getChatById(message.chatId);
      dispatch(chatsActions.addChat(newChat.data));
      dispatch(messagesActions.addNewMessage(message));
    } catch (error) {
      console.log(error);
    }
  };

export const SocketProvider: FC<PropsWithChildren> = (props) => {
  const userId = useAppSelector((state) => state.user.user._id);
  const dispatch = useAppDispatch();

  const socket = useSocket(serverLink!, {
    ackTimeout: 10000,
    reconnectionDelay: 500,
    autoConnect: false,
    query: {
      id: userId
    }
  });

  const startListeners = () => {
    socket.on(SocketEvents.RecieveMessage, (message: IMessage) => {
      dispatch(newMessageThunk(message));
      if (message.from.id === userId) return;
      audioService.newMessage();
    });
    socket.on(SocketEvents.OnlineList, (data: any) => {
      dispatch(usersActions.setOnlineList(data));
    });
    socket.on(SocketEvents.UserConnected, (data: any) => {
      dispatch(usersActions.addOnlineUser(data));
    });
    socket.on(SocketEvents.UserDisconneted, (data: any) => {
      dispatch(usersActions.delOnlineUser(data));
    });
    socket.on(
      SocketEvents.Typing,
      throttle((data: { userId: string; typing: boolean }) => {
        dispatch(usersActions.setTypingStatus(data));
      }, 2000)
    );
  };

  const sendMessage = (newMessage: IMessage) => {
    const { chatId, id: dummyMsgId } = newMessage;
    // dispatch(messagesActions.addNewMessage(newMessage));

    // const cancelMessageTimeoutId = setTimeout(() => {
    //   dispatch(messagesActions.updateMessageStatus({ chatId, msgId: dummyMsgId, status: 'error' }));
    // }, 5000);

    // const cb = () => {
    //   console.log('cb');
    //   clearTimeout(cancelMessageTimeoutId);
    // };

    socket.emit(SocketEvents.SendMessage, newMessage);
  };

  const typing = (chatId: string, typing: boolean) => {
    socket.emit(SocketEvents.Typing, { chatId, typing });
  };

  useEffect(() => {
    socket.connect();
    startListeners();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, sendMessage, typing }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const data = useContext(SocketContext);
  if (!data) {
    throw Error('Cannot use "useSocketContext" outside the "SocketProvider"');
  }
  return data;
};
