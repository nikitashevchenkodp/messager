import styled from 'styled-components';

export const MessageWrapper = styled.div<{
  type: 'sent' | 'recieved';
  isSelected: boolean;
  isSelectionMode: boolean;
  lastInGroup: boolean;
}>`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => (props.type === 'sent' ? 'row-reverse' : 'row')};
  position: relative;
  padding: 3px 10px;
  padding-left: ${(props) => (props.isSelectionMode ? '50px' : '10px')};
  cursor: ${(props) => (props.isSelectionMode ? 'pointer' : 'default')};
  transition: 0.3s;
  &::before {
    transition: 0.15s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: ${(props) => (props.isSelected ? '1' : '0')};
  }
  margin-bottom: ${(props) => props.lastInGroup && '6px'};
`;

export const MessageContainer = styled.div<{
  type: 'sent' | 'recieved';
  hasTail: boolean;
  chatType: 'privat' | 'group';
}>`
  background-color: ${(props) => (props.type === 'sent' ? 'rgb(244, 251, 227)' : '#fff')};
  border-radius: ${(props) =>
    props.type === 'sent'
      ? `12px 12px ${props.hasTail ? '0' : '4px'} 12px`
      : `12px 12px 12px ${props.hasTail ? '0' : '4px'}`};
  align-self: ${(props) => (props.type === 'sent' ? 'flex-end' : 'flex-start')};
  position: relative;
  max-width: 464px;
  transition: 0.3s;
  margin-left: ${(props) => props.chatType === 'group' && '43px'};
`;

export const MessageBody = styled.div`
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

export const MessageMainContent = styled.div`
  font-size: 14px;
  padding: 8px 12px 0px 12px;
  line-height: 1.2;
  font-weight: 500;
  position: relative;
  hyphens: auto;
`;

export const MessageMeta = styled.div`
  position: relative;
  top: 2px;
  font-size: 12px;
  float: right;
  line-height: 1.35;
  margin-left: 0.4375rem;
  margin-right: -0.5rem;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  color: rgb(160, 172, 182);
`;

export const SelectedIconContainer = styled.div`
  position: absolute;
  bottom: 5px;
  left: 20px;
`;
