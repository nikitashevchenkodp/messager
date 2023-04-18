import Button from 'components/shared/Button';
import { messagesActions } from 'blocks/chat';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { DeletionConfirmContainer } from './styled';
import { getActiveChatId, getActiveMessage, getSelectedMessagesIds } from 'store/selectors';

const DeletionConfirm = ({ cancel }: { cancel: () => void }) => {
  const dispatch = useAppDispatch();

  const activeMessage = useAppSelector(getActiveMessage);
  const selectedMessagesIds = useAppSelector(getSelectedMessagesIds);
  const selectedMessagesLength = selectedMessagesIds.length;
  const activeChatId = useAppSelector(getActiveChatId);

  const deleteMessages = () => {
    dispatch(
      messagesActions.startDeleteMessages({
        chatId: activeChatId,
        messagesIds: !selectedMessagesLength ? [activeMessage?._id || ''] : selectedMessagesIds
      })
    );
    dispatch(activeEntitiesActions.setIsOpenDeleteModal(false));
    dispatch(activeEntitiesActions.deleteAllSelectedMessagesIds());
  };

  const onCancel = () => {
    cancel();
    dispatch(activeEntitiesActions.deleteAllSelectedMessagesIds());
  };

  return (
    <DeletionConfirmContainer data-testid="delete-message-confirmation">
      <p>DeletionConfirm</p>
      <p>
        Do you really want to delete{' '}
        {selectedMessagesLength > 1 ? `${selectedMessagesLength} messages` : 'message'}?
      </p>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '40px',
          width: '100%',
          justifyContent: 'center'
        }}>
        <Button
          onClick={deleteMessages}
          style={{ background: 'red', color: '#fff', padding: '8px 16px' }}>
          Confirm
        </Button>
        <Button
          onClick={onCancel}
          style={{ background: '#fff', color: 'black', padding: '8px 16px' }}>
          Cancel
        </Button>
      </div>
    </DeletionConfirmContainer>
  );
};

export default DeletionConfirm;
