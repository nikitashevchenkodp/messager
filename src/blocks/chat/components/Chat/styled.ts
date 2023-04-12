import styled from 'styled-components';
import { CHAT_AREA_WIDTH, SM_SCREEN_WIDTH } from 'consts';
import chatBg from 'assets/bg-chat.jpg';

export const ChatStyled = styled.div<{ isChatOpen: boolean }>`
  flex-grow: 1;
  max-height: 100vh;
  overflow-x: hidden;
  transition: all 0.3s;

  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    transition: all 0.3s;
    position: absolute;
    inset: 0px;
    left: ${(props) => (props.isChatOpen ? '0' : '100%')};
  }
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
