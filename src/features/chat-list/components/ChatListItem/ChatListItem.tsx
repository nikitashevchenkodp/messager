import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import {
  Avatar,
  ChatListItemContainer,
  ChatListItemInfoContainer,
  ExtraInformation,
  LastMessage,
  LastMessageTime,
  NotifficationQuantity,
  Title
} from './styled';

interface ChatListItemProps {
  chatItem: {
    title: string;
    lastMessage: {
      messageMediaThumb?: string;
      text: string;
      time: string;
    };
    avatar: string;
  };
  active: boolean;
  onClick: (...args: unknown[]) => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ chatItem, active, onClick }) => {
  const chatListState = useAppSelector((state) => state.ui.chatListState);

  return (
    <ChatListItemContainer isActive={active} onClick={onClick}>
      <Avatar src={chatItem.avatar} />
      <ChatListItemInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Title>{chatItem.title}</Title>
        </div>
        <ExtraInformation>
          <LastMessage>{chatItem.lastMessage?.text}</LastMessage>
        </ExtraInformation>
        <LastMessageTime hide={chatListState === 'colapsed'}>
          {chatItem.lastMessage?.time}
        </LastMessageTime>
        <NotifficationQuantity>2</NotifficationQuantity>
      </ChatListItemInfoContainer>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
