import styled from 'styled-components';
import { CHAT_AREA_WIDTH, SM_SCREEN_WIDTH } from 'consts';

interface ChatStyledProps {
  readonly isHideChatList: boolean;
  readonly littleScreen?: boolean;
}

export const ChatStyled = styled.div<ChatStyledProps>`
  flex-grow: 1;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  min-width: ${CHAT_AREA_WIDTH};
  max-width: 100%;
`;
