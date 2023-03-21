/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Menu from 'components/Menu';
import Modal from 'components/Modal';
import DeletionConfirm from 'components/DeletionConfirm';
import { IMessage } from 'types';
import { messagesActions } from 'features/chat/redux/chat';
import ChatMessages from '../ChatMessages';
import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const MessageMenu = styled.ul`
  border-radius: 8px;
  background-color: #fff;
  padding: 6px 0;
  overflow: hidden;
`;

const MenuItem = styled.li`
  padding: 5px 10px;
  background: #fff;
  width: 150px;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ChatArea = () => {
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const messages = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId || '']?.messages
  );
  const scrollRef = useScrollToBottom(messages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [openedMessageMenu, setOpenedMessageMenu] = useState<null | IMessage>(null);

  const dispatch = useAppDispatch();

  const openMessageMenu = useCallback((e: React.MouseEvent, message: IMessage) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    setOpenedMessageMenu(message);
    setIsMenuOpen(true);
  }, []);

  const editMessage = useCallback(() => {
    dispatch(
      messagesActions.setEditableMessage({
        messageId: openedMessageMenu?._id,
        chatId: activeChatId!
      })
    );
  }, [openedMessageMenu]);

  const openDeletionModal = useCallback(() => {
    setIsDeleteOpen(true);
  }, []);

  const closeDeletionModal = useCallback(() => {
    setIsDeleteOpen(false);
  }, []);

  const deleteMessage = useCallback(() => {
    openedMessageMenu && dispatch(messagesActions.startDeleteMessage(openedMessageMenu));
    setIsDeleteOpen(false);
  }, [openedMessageMenu]);

  const onModalClose = useCallback(() => setIsDeleteOpen(!isDeleteOpen), []);
  console.log('rendr Chat Area');

  return (
    <>
      <Menu isOpen={isMenuOpen} coordinates={coordinates} onClose={() => setIsMenuOpen(false)}>
        <MessageMenu>
          <MenuItem onClick={openDeletionModal}>
            <DeleteOutlineIcon />
            Delete
          </MenuItem>
          <MenuItem onClick={editMessage}>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem onClick={() => console.log('reply')}>
            <ReplyIcon />
            Reply
          </MenuItem>
          <MenuItem onClick={() => console.log('select')}>
            <CheckCircleOutlineIcon />
            Select
          </MenuItem>
        </MessageMenu>
      </Menu>
      <ChatMessages messages={messages} scrollRef={scrollRef} openMessageMenu={openMessageMenu} />
      <Modal active={isDeleteOpen} onClose={onModalClose}>
        <DeletionConfirm confirm={deleteMessage} cancel={closeDeletionModal} />
      </Modal>
    </>
  );
};

export default ChatArea;
