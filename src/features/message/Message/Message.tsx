import React, { forwardRef, useState } from 'react';
import {
  MessageContainer,
  MessageContent,
  RecieveTailContainer,
  SentTailContainer
} from './styled';
import { MessageRecieveTail, MessageSentTail } from 'components/icons';
import { useAppSelector } from 'store/hooks';
import { IMessage } from 'types';
import MediaMessage from '../MediaMessage';
import WindowEvent from '../../../helpers/WindowEventWrapper';

interface IMessageProps {
  message: IMessage;
}
import MessageTextContent from '../MessageTextContent';
import FastReaction from '../FastReaction';
import messagePhoto from '../../../assets/mockmessagePhoto.jpg';
import { mockMessage } from 'mock/message';
import Menu from 'components/Menu';
import { useAppDispatch } from 'store/hooks';
import { chatsActions } from 'features/chat';
import Modal from 'components/Modal';
import DeletionConfirm from 'components/DeletionConfirm';

const Message = forwardRef<HTMLDivElement, IMessageProps>(({ message }, ref) => {
  const { _id } = useAppSelector((state) => state.authentication.user);
  const type = message?.from === _id ? 'sent' : 'recieved';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const dispatch = useAppDispatch();

  const openMessageMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    setIsMenuOpen(true);
  };

  const editMessage = (messageId: string, chatId: string) => {
    console.log('edit');

    // dispatch(chatsActions.setEditableMessage({ messageId, chatId }));
  };
  const deleteMessage = (message: IMessage) => {
    setSelectedMessage(message);
    setIsDeleteOpen(true);
  };

  return (
    <>
      <Menu isOpen={isMenuOpen} coordinates={coordinates} onClose={() => setIsMenuOpen(false)}>
        <ul>
          <li
            style={{ padding: '5px 10px', background: '#fff' }}
            onClick={() => deleteMessage(message)}>
            Delete
          </li>
          <li
            style={{ padding: '5px 10px', background: '#fff' }}
            onClick={() => editMessage(message._id, message.chatId)}>
            edit
          </li>
        </ul>
      </Menu>
      <MessageContainer type={type} ref={ref} onContextMenu={openMessageMenu}>
        <MessageContent>
          <MediaMessage media={mockMessage.attachment?.media} />
          <MessageTextContent
            type={type}
            text={message?.text}
            meta={{ createdAt: message?.createdAt, delivered: false }}
            reactions={mockMessage.reactions}
          />
        </MessageContent>
        {message?.from !== _id ? (
          <RecieveTailContainer>
            <MessageRecieveTail />
          </RecieveTailContainer>
        ) : (
          <SentTailContainer>
            <MessageSentTail />
          </SentTailContainer>
        )}
        <FastReaction position={message?.from !== _id ? 'right' : 'left'} />
      </MessageContainer>
      <Modal active={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <DeletionConfirm
          confirm={() => {
            console.log('delete');
            dispatch(chatsActions.startDeleteMessage(selectedMessage!));
            setIsDeleteOpen(false);
          }}
          cancel={() => {
            setSelectedMessage(null);
            setIsDeleteOpen(false);
          }}
        />
      </Modal>
    </>
  );
});

Message.displayName = 'Message';

export default Message;
