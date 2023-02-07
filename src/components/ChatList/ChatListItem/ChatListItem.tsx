import React from 'react';
import { useAppSelector } from '../../../store/hooks';
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

const ChatListItem = () => {
  const chatListState = useAppSelector((state) => state.ui.chatListState);

  return (
    <ChatListItemContainer>
      <Avatar />
      <ChatListItemInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Title>Dasha Yefimova</Title>
        </div>
        <ExtraInformation>
          <LastMessage>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, perspiciatis. Pariatur
            animi magni deleniti et magnam saepe nihil incidunt repellat! Hic animi placeat velit
            est accusantium temporibus unde eveniet quidem aut provident, amet fuga odit blanditiis
            impedit, et, quis ab!
          </LastMessage>
        </ExtraInformation>
        <LastMessageTime hide={chatListState === 'colapsed'}>13:46</LastMessageTime>
        <NotifficationQuantity>2</NotifficationQuantity>
      </ChatListItemInfoContainer>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
