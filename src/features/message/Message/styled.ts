import styled from 'styled-components';

export const MessageContainer = styled.div<{ type: 'sent' | 'recieved' }>`
  background-color: ${(props) => (props.type === 'sent' ? 'rgb(244, 251, 227)' : '#fff')};
  border-radius: ${(props) => (props.type === 'sent' ? '10px 10px 0 10px' : '10px 10px 10px 0;')};
  align-self: ${(props) => (props.type === 'sent' ? 'flex-end' : 'flex-start')};

  margin-bottom: 8px;
  position: relative;
  max-width: 464px;
`;

export const MessageContent = styled.div`
  overflow: hidden;
  border-radius: 10px 10px 0 0;
`;
export const MessageHeader = styled.div`
  padding: 0px 10px 5px;
`;

export const MessageAuthor = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: rgb(22, 138, 205);
  cursor: pointer;
`;

export const SentTailContainer = styled.div`
  position: absolute;
  height: 18px;
  bottom: -1px;
  right: -9px;
`;
export const RecieveTailContainer = styled.div`
  position: absolute;
  height: 18px;
  bottom: -1px;
  left: -9px;
`;
