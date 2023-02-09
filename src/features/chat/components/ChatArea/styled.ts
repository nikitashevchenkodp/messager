import styled from 'styled-components';
import { CHAT_CONTROLS_HEIGHT, CHAT_HEADER_HEIGHT } from 'consts';
import chatBg from 'assets/bg-chat.jpg';

export const ChatAreaStyled = styled.div`
  background-image: url(${chatBg});
  background-size: auto;
  height: calc(100% - ${CHAT_HEADER_HEIGHT}px - ${CHAT_CONTROLS_HEIGHT}px);
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: scroll;
`;
