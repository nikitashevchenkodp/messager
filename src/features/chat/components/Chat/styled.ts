import styled from 'styled-components';
import { SM_SCREEN_WIDTH } from 'consts';

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

  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    min-width: ${(props) => !props.isHideChatList && '0'};
    /* width: ${(props) => (!props.isHideChatList ? '0' : '100%')};
    max-width: ${(props) => (!props.isHideChatList ? '50%' : '100vw')}; */
  }
`;
