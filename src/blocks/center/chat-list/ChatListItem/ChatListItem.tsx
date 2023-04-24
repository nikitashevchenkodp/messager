import TypingIndicator from 'components/TypingIndicator';
import { isUserId } from 'helpers/isUserId';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import { getChatListState, getLastMessage, getUsersById, getUserStatusById } from 'store/selectors';
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
  const chatListState = useAppSelector(getChatListState);
  const userStatus = useAppSelector((state) => getUserStatusById(state, chatItem.id));
  const lastMessage = useAppSelector((state) => getLastMessage(state, chatItem.id));
  const users = useAppSelector(getUsersById);
  const newMessages = 0;
  const extraInformation = isUserId(chatItem.id) ? (
    <LastMessage>
      {userStatus?.typing ? (
        <TypingIndicator />
      ) : (
        <span data-testid="chat-list-item-lastmessage">{lastMessage?.text}</span>
      )}
    </LastMessage>
  ) : (
    <LastMessage>
      <span style={{ marginRight: '4px', fontWeight: 500, color: 'blue' }}>
        {users[lastMessage?.from]?.fullName || 'You'}:
      </span>
      <span data-testid="chat-list-item-lastmessage">{lastMessage?.text}</span>
    </LastMessage>
  );

  return (
    <ChatListItemContainer isActive={active} onClick={onClick} data-testid="chat-list-item">
      <AvatarContainer>
        <Avatar src={chatItem?.avatar} fullName={chatItem.title} />
        <NetworkStatus online={userStatus?.online} />
      </AvatarContainer>
      <ChatListItemInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Title>{chatItem?.title}</Title>
        </div>
        <ExtraInformation>{extraInformation}</ExtraInformation>
        <LastMessageTime hide={chatListState === 'colapsed'}>
          {parseDate(lastMessage?.createdAt)}
        </LastMessageTime>
        {Boolean(newMessages) && <NotifficationQuantity>2</NotifficationQuantity>}
      </ChatListItemInfoContainer>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
