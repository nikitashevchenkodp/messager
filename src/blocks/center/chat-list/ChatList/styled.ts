import styled from 'styled-components';
import { CHAT_AREA_WIDTH, SM_SCREEN_WIDTH } from 'consts';

interface ChatListContainerProps {
  readonly defaultWidth?: number;
}

export const ChatListContainer = styled.div`
  background-color: #fff;
  border-right: 1px solid grey;
  position: relative;
  height: 100vh;
  max-width: calc(100% - ${CHAT_AREA_WIDTH}px);

  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    display: none;
  }
`;
export const ChatListResizeContainer = styled.div<ChatListContainerProps>`
  width: ${(props) => (props.defaultWidth ? `${props.defaultWidth}px` : '350px')};
  max-width: 100%;
`;
export const ChatListContainerSmallScreen = styled.div<{ isHide: boolean }>`
  display: none;
  overflow-x: hidden;
  width: ${(props) => (props.isHide ? '0' : '100%')};
  transition: 0.2s;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    display: block;
  }
`;

export const ChatListStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  position: relative;
  padding-top: 60px;
`;

export const ChatListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0px 15px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const List = styled.div`
  max-height: 100%;
  overflow-y: scroll;
`;
