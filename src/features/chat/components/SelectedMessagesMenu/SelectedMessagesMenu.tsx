import Button from 'components/shared/Button';
import { CHAT_HEADER_HEIGHT } from 'consts';
import { messagesActions } from 'features/chat/redux/chat';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import styled from 'styled-components';

interface ISelectedMessagesMenuProps {
  selectedMessagesIds: Record<PropertyKey, string>;
  deleteAllSelectedMessages: () => void;
}

const SelectedMessagesMenuContainer = styled.div<{ isSelectedMessages: boolean }>`
  height: ${CHAT_HEADER_HEIGHT}px;
  padding: 0 15px;
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: 0.2s;
  transform: ${(props) => (props.isSelectedMessages ? 'none' : 'translateY(-100%)')};
  opacity: ${(props) => (props.isSelectedMessages ? '1' : '0')};
`;

const TextButton = styled(Button)`
  margin-left: auto;
  color: rgb(22, 138, 205);
  padding: 8px 16px;
  transition: 0.1s;
  border-radius: 4px;
  font-size: 15px;
  &:hover {
    background-color: rgba(22, 138, 205, 0.1);
  }
`;

const PrimaryButton = styled(Button)`
  background-color: rgb(57, 165, 219);
  color: #fff;
  text-transform: uppercase;
  padding: 8px 16px;
  transition: 0.1s;
  border-radius: 4px;
  font-size: 15px;
`;

const SelectedMessagesMenu = () => {
  const selectedMessages = useAppSelector(
    (state) => state.entities.active.activeChat.selectedMessagesIds
  );

  const selectedMessagesQuantity = Object.keys(selectedMessages).length;

  const dispatch = useAppDispatch();

  return (
    <SelectedMessagesMenuContainer isSelectedMessages={Boolean(selectedMessagesQuantity)}>
      <PrimaryButton>Forward {selectedMessagesQuantity}</PrimaryButton>
      <PrimaryButton onClick={() => dispatch(activeEntitiesActions.setIsOpenDeleteModal(true))}>
        Delete {selectedMessagesQuantity}
      </PrimaryButton>
      <TextButton onClick={() => dispatch(activeEntitiesActions.deleteAllSelectedMessagesIds())}>
        Cancel
      </TextButton>
    </SelectedMessagesMenuContainer>
  );
};

export default SelectedMessagesMenu;
