import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { IChat } from 'types';
import {
  Avatar,
  AvatarContainer,
  ChatListItemContainer,
  ChatListItemInfoContainer,
  ExtraInformation,
  LastMessage,
  LastMessageTime,
  NetworkStatus,
  NotifficationQuantity,
  Title
} from './styled';

interface ChatListItemProps {
  chatItem: IChat;
  active: boolean;
  type: 'expanded' | 'colapsed';
  onClick: (...args: unknown[]) => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ chatItem, active, onClick }) => {
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const online = useAppSelector((state) => state.userStatuses.onlineMap[chatItem.partnerId]);
  const typing = useAppSelector(
    (state) => state.userStatuses.onlineMap[chatItem.partnerId]?.typing
  );
  const parseDate = (date: string) => {
    return new Date(date).toTimeString().slice(0, 5);
  };
  console.log('render', chatItem.partnerFullName);

  return (
    <ChatListItemContainer isActive={active} onClick={onClick}>
      <AvatarContainer>
        <Avatar src={chatItem?.partnerAvatar} />
        <NetworkStatus online={Boolean(online)} />
      </AvatarContainer>
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
            {typing ? (
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
