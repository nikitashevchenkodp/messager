import React, { forwardRef } from 'react';
import {
  MessageContainer,
  MessageBody,
  MessageWrapper,
  RecieveTailContainer,
  SentTailContainer,
  MessageMainContent,
  SelectedIconContainer
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

const Text = styled.p``;

const Message = forwardRef<HTMLDivElement, IMessageProps>(
  ({ messageId, openMessageMenu, firstInGroup, lastInGroup }, ref) => {
    const { _id } = useAppSelector((state) => state.authentication.user);
    const activechatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
    const isSelectiondModeOn = useAppSelector(
      (state) => Object.values(state.entities.active.activeChat.selectedMessagesIds).length > 0
    );
    const isSelected = useAppSelector((state) =>
      Boolean(state.entities.active.activeChat?.selectedMessagesIds[messageId])
    );
    const dispatch = useAppDispatch();
    const message = useAppSelector(
      (state) => state.entities.messages.byChatId[activechatId || ''].messages[messageId]
    );
    const type = message?.from === _id ? 'sent' : 'recieved';

    return (
      <>
        <MessageWrapper
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
          <MessageContainer
            hasTail={(firstInGroup && lastInGroup) || lastInGroup}
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
              (message?.from !== _id ? (
                <RecieveTailContainer data-testid="message-tail-recieved">
                  <MessageRecieveTail />
                </RecieveTailContainer>
              ) : (
                <SentTailContainer>
                  <MessageSentTail data-testid="message-tail-sent" />
                </SentTailContainer>
              ))}
            <FastReaction position={message?.from !== _id ? 'right' : 'left'} />
          </MessageContainer>
        </MessageWrapper>
      </>
    );
  }
);

Message.displayName = 'Message';

export default Message;
