import { CHAT_CONTROLS_HEIGHT, CHAT_HEADER_HEIGHT } from 'consts';
import styled from 'styled-components';

export const ChatMessagesStyled = styled.div`
  background-size: auto;
  height: calc(100% - ${CHAT_HEADER_HEIGHT}px - ${CHAT_CONTROLS_HEIGHT}px);
  padding: 10px 0;
  position: relative;
  max-height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export const NotMessages = styled.div`
  width: 170px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DateLabel = styled.span`
  padding: 4px 8px;
  background: #4a8e3a8c;
  border-radius: 12px;
  text-align: center;
  color: white;
  font-size: 14px;
`;
export const DateLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 10px;
`;

export const DateGroupContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;
