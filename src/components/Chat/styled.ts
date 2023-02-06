import styled from 'styled-components';
import { CHAT_CONTROLS_HEIGHT, SM_SCREEN_WIDTH } from '../../consts';

interface ChatStyledProps {
  readonly isHideChatList: boolean;
  readonly littleScreen?: boolean;
}

export const ChatStyled = styled.div<ChatStyledProps>`
  flex-grow: 1;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  min-width: 420px;
  max-width: 100%;
  /* transition: ${(props) => (props.littleScreen ? '0.2s' : '0')}; */

  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    min-width: ${(props) => !props.isHideChatList && '0'};
    width: ${(props) => (!props.isHideChatList ? '0' : '100%')};
    max-width: ${(props) => (!props.isHideChatList ? '50%' : '100vw')};
  }
`;

export const ChatControlsStyled = styled.div`
  height: ${CHAT_CONTROLS_HEIGHT}px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
