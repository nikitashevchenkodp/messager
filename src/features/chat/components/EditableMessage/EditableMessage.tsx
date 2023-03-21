import Button from 'components/shared/Button';
import React, { FC } from 'react';
import styled from 'styled-components';
import { IMessage } from 'types';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { messagesActions } from 'features/chat/redux/chat';

interface IEditableMessageProps {
  message: IMessage;
  setInputValue: (val: string) => void;
}

const IconButton = styled(Button)`
  padding: 10px 15px;
`;

const EditableMessageContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CentrContainer = styled.div`
  flex: 1;
`;
const Title = styled.p``;
const MessageText = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
`;

const EditableMessage: FC<IEditableMessageProps> = ({ message, setInputValue }) => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const onClose = () => {
    setInputValue('');
    dispatch(messagesActions.setEditableMessage({ chatId: activeChatId! }));
  };

  return (
    <EditableMessageContainer>
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
