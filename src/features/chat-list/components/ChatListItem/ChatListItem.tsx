import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
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
  chatItem: any;
  active: boolean;
  type: 'expanded' | 'colapsed';
  onClick: (...args: unknown[]) => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ chatItem, active, onClick }) => {
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const { status, userId } = useAppSelector((state) => state.chatArea.typingStatus);
  const showTyping = chatItem.partnerId === userId;
  const parseDate = (date: string) => {
    return new Date(date).toTimeString().slice(0, 5);
  };

  return (
    <ChatListItemContainer isActive={active} onClick={onClick}>
      <Avatar src={chatItem?.partnerAvatar} />
      <ChatListItemInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Title>{chatItem?.partnerFullName}</Title>
        </div>
        <ExtraInformation>
          <LastMessage>
            {showTyping && status === 'typing' ? (
              <span style={{ color: 'blue' }}>Typing...</span>
            ) : (
              <>{chatItem?.lastMessage?.messageText}</>
            )}
          </LastMessage>
        </ExtraInformation>
        <LastMessageTime hide={chatListState === 'colapsed'}>
          {parseDate(chatItem?.lastMessage?.createdAt)}
        </LastMessageTime>
        <NotifficationQuantity>2</NotifficationQuantity>
      </ChatListItemInfoContainer>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
