import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { IChat } from 'types';
import { parseDate } from 'utils';
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
  const chatListState = useAppSelector((state) => state.ui.uiSettings.chatListState);
  const online = useAppSelector((state) => state.users.statusesById[chatItem.user.id]);
  const messagesIds = useAppSelector(
    (state) => state.entities.messages.byChatId[chatItem.chatId]?.messagesIds
  );
  const lastMessageId = messagesIds?.[messagesIds.length - 1];
  const lastMessage = useAppSelector(
    (state) => state.entities.messages.byChatId[chatItem.chatId]?.messages[lastMessageId]
  );

  return (
    <ChatListItemContainer isActive={active} onClick={onClick} data-testid="chat-list-item">
      <AvatarContainer>
        <Avatar src={chatItem?.user.avatar} />
        <NetworkStatus online={Boolean(online)} />
      </AvatarContainer>
      <ChatListItemInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Title>{chatItem?.user.fullName}</Title>
        </div>
        <ExtraInformation>
          <LastMessage>
            {online?.typing ? (
              <span style={{ color: 'blue' }}>Typing...</span>
            ) : (
              <span data-testid="chat-list-item-lastmessage">{lastMessage?.text}</span>
            )}
          </LastMessage>
        </ExtraInformation>
        <LastMessageTime hide={chatListState === 'colapsed'}>
          {parseDate(lastMessage?.createdAt)}
        </LastMessageTime>
        <NotifficationQuantity>2</NotifficationQuantity>
      </ChatListItemInfoContainer>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
