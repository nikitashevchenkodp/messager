import React, { forwardRef } from 'react';
import {
  MessageContainer,
  MessageBody,
  MessageWrapper,
  RecieveTailContainer,
  SentTailContainer,
  MessageMainContent,
  SelectedIconContainer,
  MessageAuthor,
  MessageHeader
} from './styled';
import { MessageRecieveTail, MessageSentTail } from 'components/icons';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IMessage } from 'types';
import MediaMessage from '../MediaMessage';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
interface IMessageProps {
  messageId: string;
  openMessageMenu: (e: React.MouseEvent, message: IMessage) => void;
  firstInGroup: boolean;
  lastInGroup: boolean;
}
import FastReaction from '../FastReaction';
import Reactions from '../Reactions';
import styled from 'styled-components';
import MessageMeta from '../MessageMeta';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import MuiIconWrapper from 'components/shared/MuiIconWrapper/MuiIconWrapper';
import {
  getActiveChat,
  getActiveChatId,
  getCurrentUserId,
  getMessageById,
  getUsersById,
  isMessageSelected,
  isSelectionModeOn
} from 'store/selectors';
import { isUserId } from 'helpers/isUserId';
import { Avatar } from 'components/shared/Avatar';

const Text = styled.p``;

const Message = forwardRef<HTMLDivElement, IMessageProps>(
  ({ messageId, openMessageMenu, firstInGroup, lastInGroup }, ref) => {
    const dispatch = useAppDispatch();

    const currentUserId = useAppSelector(getCurrentUserId);
    const activechatId = useAppSelector(getActiveChatId);
    const activechat = useAppSelector(getActiveChat);
    const isSelectiondModeOn = useAppSelector(isSelectionModeOn);
    const isSelected = useAppSelector((state) => isMessageSelected(state, messageId));
    const message = useAppSelector((state) => getMessageById(state, activechatId, messageId));
    const users = useAppSelector(getUsersById);

    const type = message?.from === currentUserId ? 'sent' : 'recieved';
    const avatar = ((firstInGroup && lastInGroup) || lastInGroup) &&
      type === 'recieved' &&
      !isUserId(activechatId) && (
        <Avatar
          styles={{
            width: '34px',
            height: '34px',
            fontSize: '13px',
            position: 'absolute',
            bottom: '5px'
          }}
          src={users[message.from]?.avatar}
          fullName={users[message.from]?.fullName}
        />
      );

    // const senderName = ((firstInGroup && lastInGroup) || firstInGroup) &&
    //   type === 'recieved' &&
    //   !isUserId(activechatId) && (
    //     <MessageHeader>
    //       <MessageAuthor>{users[message.from]?.fullName}</MessageAuthor>
    //     </MessageHeader>
    //   );

    return (
      <>
        <MessageWrapper
          lastInGroup={lastInGroup}
          isSelectionMode={isSelectiondModeOn}
          isSelected={isSelected}
          onContextMenu={(e) => openMessageMenu(e, message)}
          type={type}
          onClick={
            isSelectiondModeOn
              ? () => dispatch(activeEntitiesActions.toggleItemInSelectedMessagesIds(messageId))
              : undefined
          }
          data-testid={`message-container-${message._id}`}>
          {isSelectiondModeOn && (
            <SelectedIconContainer>
              {isSelected ? (
                <MuiIconWrapper styles={{ color: 'green' }}>
                  <CheckCircleOutlineIcon color="inherit" />
                </MuiIconWrapper>
              ) : (
                <MuiIconWrapper styles={{ color: 'white' }}>
                  <RadioButtonUncheckedIcon />
                </MuiIconWrapper>
              )}
            </SelectedIconContainer>
          )}
          {avatar}
          <MessageContainer
            hasTail={(firstInGroup && lastInGroup) || lastInGroup}
            chatType={activechat.type || 'privat'}
            ref={ref}
            type={type}>
            <MessageBody>
              <MediaMessage media={message.attachment?.media} />
              <MessageMainContent>
                <Text data-testid="message-text">{message.text}</Text>
                <Reactions
                  type={type}
                  reactions={message.reactions}
                  messageId={message._id}
                  chatId={message.chatId}
                />
                <MessageMeta
                  meta={{
                    edited: message.edited,
                    createdAt: message.createdAt
                  }}
                />
              </MessageMainContent>
            </MessageBody>
            {((firstInGroup && lastInGroup) || lastInGroup) &&
              (message?.from !== currentUserId ? (
                <RecieveTailContainer data-testid="message-tail-recieved">
                  <MessageRecieveTail />
                </RecieveTailContainer>
              ) : (
                <SentTailContainer>
                  <MessageSentTail data-testid="message-tail-sent" />
                </SentTailContainer>
              ))}
            <FastReaction position={message?.from !== currentUserId ? 'right' : 'left'} />
          </MessageContainer>
        </MessageWrapper>
      </>
    );
  }
);

Message.displayName = 'Message';

export default Message;
