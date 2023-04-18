import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Menu from 'components/shared/Menu';
import Modal from 'components/shared/Modal';
import DeletionConfirm from 'components/DeletionConfirm';
import { IMessage } from 'types';
import { messagesActions } from 'blocks/chat/redux/chat';
import ChatMessages from '../ChatMessages';
import ReactionsMenu from 'blocks/message/ReactionsMenu';
import MenuOptions from 'blocks/message/MesageMenu';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { getActiveChatId, getActiveMessage, getCurrentUser, getIsModalOpen } from 'store/selectors';
import { MessageMenuContainer } from './styled';

const ChatArea = () => {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const activeChatId = useAppSelector(getActiveChatId);
  const { _id, avatar, fullName } = useAppSelector(getCurrentUser);
  const activeMessage = useAppSelector(getActiveMessage);
  const isModalOpen = useAppSelector(getIsModalOpen);

  const openMessageMenu = useCallback((e: React.MouseEvent, message: IMessage) => {
    e.preventDefault();
    setCoordinates({ x: e.clientX, y: e.clientY });
    dispatch(activeEntitiesActions.setActiveMessage(message));
    setIsMenuOpen(true);
  }, []);

  const editMessage = useCallback(() => {
    dispatch(
      messagesActions.setEditableMessage({
        messageId: activeMessage?._id || '',
        chatId: activeChatId
      })
    );
  }, [activeMessage]);

  const openDeletionModal = useCallback(() => {
    dispatch(activeEntitiesActions.setIsOpenDeleteModal(true));
  }, []);

  const closeDeletionModal = useCallback(() => {
    dispatch(activeEntitiesActions.setIsOpenDeleteModal(false));
  }, []);

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
        <MessageMenuContainer data-testid="message-menu">
          <ReactionsMenu
            addReaction={addReaction}
            alreadeMadeReactions={activeMessage?.reactions}
          />
          <MenuOptions onEdit={editMessage} onDelete={openDeletionModal} onSelect={selectMessage} />
        </MessageMenuContainer>
      </Menu>
      <ChatMessages openMessageMenu={openMessageMenu} />
      <Modal active={isModalOpen} onClose={closeDeletionModal}>
        <DeletionConfirm cancel={closeDeletionModal} />
      </Modal>
    </>
  );
};

export default ChatArea;
