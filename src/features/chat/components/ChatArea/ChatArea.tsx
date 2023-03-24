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

const MessageMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IChatAreaProps {
  addToSelected: (id: string) => void;
  toggleFromSelected: (id: string) => void;
  selectedMessagesIds: Record<PropertyKey, string>;
}

const ChatArea: FC<IChatAreaProps> = ({
  addToSelected,
  selectedMessagesIds,
  toggleFromSelected
}) => {
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [openedMessageMenu, setOpenedMessageMenu] = useState<null | IMessage>(null);
  const { _id, avatar, fullName } = useAppSelector((state) => state.authentication.user);
  console.log(selectedMessagesIds);

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

  const onDeleteModalClose = useCallback(() => setIsDeleteOpen(!isDeleteOpen), []);

  const addReaction = (e: React.MouseEvent) => {
    console.log(openedMessageMenu);

    const reactionItem = {
      chatId: openedMessageMenu?.chatId,
      messageId: openedMessageMenu?._id,
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
    addToSelected(openedMessageMenu?._id || '');
  };

  return (
    <>
      <Menu isOpen={isMenuOpen} coordinates={coordinates} onClose={() => setIsMenuOpen(false)}>
        <MessageMenuContainer>
          <ReactionsMenu
            addReaction={addReaction}
            alreadeMadeReactions={openedMessageMenu?.reactions}
          />
          <MenuOptions onEdit={editMessage} onDelete={openDeletionModal} onSelect={selectMessage} />
        </MessageMenuContainer>
      </Menu>
      <ChatMessages
        toggleFromSelected={toggleFromSelected}
        selectedMessagesIds={selectedMessagesIds}
        openMessageMenu={openMessageMenu}
      />
      <Modal active={isDeleteOpen} onClose={onDeleteModalClose}>
        <DeletionConfirm confirm={deleteMessage} cancel={closeDeletionModal} />
      </Modal>
    </>
  );
};

export default ChatArea;
