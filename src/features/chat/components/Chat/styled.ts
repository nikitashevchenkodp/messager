import styled from 'styled-components';
import { CHAT_AREA_WIDTH } from 'consts';
import chatBg from 'assets/bg-chat.jpg';

export const ChatStyled = styled.div`
  flex-grow: 1;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  min-width: ${CHAT_AREA_WIDTH};
  max-width: 100%;
  background-image: url(${chatBg});
`;

export const NoActveChats = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SelectChat = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 5px 15px;
`;
