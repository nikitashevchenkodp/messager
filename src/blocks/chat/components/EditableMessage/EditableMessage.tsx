import Button from 'components/shared/Button';
import React, { FC } from 'react';
import styled from 'styled-components';
import { IMessage } from 'types';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { messagesActions } from 'blocks/chat/redux/chat';
import { getActiveChatId } from 'store/selectors';
import { CentrContainer, EditableMessageContainer, IconButton, MessageText, Title } from './styled';

interface IEditableMessageProps {
  message: IMessage;
  setInputValue: (val: string) => void;
}

const EditableMessage: FC<IEditableMessageProps> = ({ message, setInputValue }) => {
  const dispatch = useAppDispatch();

  const activeChatId = useAppSelector(getActiveChatId);

  const onClose = () => {
    setInputValue('');
    dispatch(messagesActions.setEditableMessage({ chatId: activeChatId!, messageId: '' }));
  };

  return (
    <EditableMessageContainer data-testid="editable-message">
      <IconButton>
        <EditIcon width="13px" height="13px" />
      </IconButton>
      <CentrContainer>
        <Title>Edit message</Title>
        <MessageText>{message.text}</MessageText>
      </CentrContainer>
      <IconButton onClick={onClose}>
        <CloseIcon width="13px" height="13px" />
      </IconButton>
    </EditableMessageContainer>
  );
};

export default EditableMessage;
