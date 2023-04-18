import Button from 'components/shared/Button';
import styled from 'styled-components';

export const IconButton = styled(Button)`
  padding: 10px 15px;
`;

export const EditableMessageContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const CentrContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;
export const Title = styled.p``;
export const MessageText = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
`;
