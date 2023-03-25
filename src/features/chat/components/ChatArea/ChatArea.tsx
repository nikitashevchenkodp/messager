/* eslint-disable react/prop-types */
import React, { FC, useCallback, useState } from 'react';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Menu from 'components/Menu';
import Modal from 'components/Modal';
import DeletionConfirm from 'components/DeletionConfirm';
import { IMessage } from 'types';
import { messagesActions } from 'features/chat/redux/chat';
import ChatMessages from '../ChatMessages';
import styled from 'styled-components';
import ReactionsMenu from 'features/message/ReactionsMenu';
import MenuOptions from 'features/message/MesageMenu';
import { activeEntitiesActions } from 'store/slices/activeEntities';

const MessageMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatArea = () => {
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const { _id, avatar, fullName } = useAppSelector((state) => state.authentication.user);
  const activeMessage = useAppSelector((state) => state.entities.active.activeChat.activeMessage);
  const isModalOpen = useAppSelector((state) => state.entities.active.activeChat.isOpenDeleteModal);
  const dispatch = useAppDispatch();

  const openMessageMenu = useCallback((e: React.MouseEvent, message: IMessage) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    dispatch(activeEntitiesActions.setActiveMessage(message));
    setIsMenuOpen(true);
  }, []);

  const editMessage = useCallback(() => {
    dispatch(
      messagesActions.setEditableMessage({
        messageId: activeMessage?._id,
        chatId: activeChatId!
      })
    );
  }, [activeMessage]);

  const openDeletionModal = useCallback(() => {
    dispatch(activeEntitiesActions.setIsOpenDeleteModal(true));
  }, []);

  const closeDeletionModal = useCallback(() => {
    dispatch(activeEntitiesActions.setIsOpenDeleteModal(false));
  }, []);

  const deleteMessage = useCallback(() => {
    activeMessage &&
      dispatch(
        messagesActions.startDeleteMessages({
          chatId: activeChatId,
          messagesIds: [activeMessage._id]
        })
      );
    dispatch(activeEntitiesActions.setIsOpenDeleteModal(false));
  }, [activeMessage]);

  const addReaction = (e: React.MouseEvent) => {
    const reactionItem = {
      chatId: activeMessage?.chatId,
      messageId: activeMessage?._id,
      reaction: {
        reaction: e.currentTarget.textContent,
        by: {
          id: _id,
          avatar,
          fullName
        }
      }
    };
    dispatch({ type: 'addReaction', payload: reactionItem });
  };

  const selectMessage = () => {
    dispatch(activeEntitiesActions.addToSelectedMessagesIds());
  };

  return (
    <>
      <Menu isOpen={isMenuOpen} coordinates={coordinates} onClose={() => setIsMenuOpen(false)}>
        <MessageMenuContainer>
          <ReactionsMenu
            addReaction={addReaction}
            alreadeMadeReactions={activeMessage?.reactions}
          />
          <MenuOptions onEdit={editMessage} onDelete={openDeletionModal} onSelect={selectMessage} />
        </MessageMenuContainer>
      </Menu>
      <ChatMessages openMessageMenu={openMessageMenu} />
      <Modal active={isModalOpen} onClose={closeDeletionModal}>
        <DeletionConfirm confirm={deleteMessage} cancel={closeDeletionModal} />
      </Modal>
    </>
  );
};

export default ChatArea;
