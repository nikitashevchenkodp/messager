import { CHAT_CONTROLS_HEIGHT, CHAT_HEADER_HEIGHT } from 'consts';
import styled from 'styled-components';

export const ChatMessagesStyled = styled.div`
  background-size: auto;
  height: calc(100% - ${CHAT_HEADER_HEIGHT}px - ${CHAT_CONTROLS_HEIGHT}px);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  overflow-y: scroll;
`;
