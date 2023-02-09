import styled from 'styled-components';

export const MessageContainer = styled.div<{ type: 'recieve' | 'sent' }>`
  background-color: rgb(244, 251, 227);
  border-radius: ${(props) => (props.type === 'sent' ? '10px 10px 0 10px' : '10px 10px 10px 0;')};
  align-self: ${(props) => (props.type === 'sent' ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
  position: relative;
  max-width: 464px;
  padding: 5px 8px;
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

export const MessageText = styled.div`
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
`;

export const MessageMedia = styled.div`
  margin-bottom: 4px;
`;

export const MessageImage = styled.img``;

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

export const MessageMeta = styled.div`
  font-size: 12px;
  /* position: relative;
  top: 0;
  bottom: auto !important; */
  float: right;
  line-height: 1.35;
  /* height: calc(var(--message-meta-height, 1rem)); */
  margin-left: 0.4375rem;
  margin-right: -0.5rem;
  user-select: none;
  cursor: pointer;
  /* right: 0; */
  display: flex;
  align-items: center;
  color: rgb(160, 172, 182);
`;
