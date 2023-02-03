import styled from 'styled-components';
import chatBg from '../../assets/bg-chat.jpg';

interface ChatStyledProps {
  readonly isHideChatList: boolean;
  readonly littleScreen?: boolean;
}

const chatHeadersHeight = 60;
const chatControlsHeight = 50;

export const ChatStyled = styled.div<ChatStyledProps>`
  flex-grow: 1;
  max-height: 100vh;
  position: relative;
  overflow-x: hidden;
  min-width: ${(props) => (!props.isHideChatList && props.littleScreen ? '0' : '420px')};
  width: ${(props) => (!props.isHideChatList && props.littleScreen ? '0' : 'auto')};
  max-width: ${(props) => (!props.isHideChatList && props.littleScreen ? '0' : '100vw')};
  transition: ${(props) => (props.littleScreen ? '0.2s' : '0')};
`;

export const ChatHeaderStyled = styled.div`
  height: ${chatHeadersHeight}px;
  background-color: #fff;
`;
export const ChatAreaStyled = styled.div`
  background-image: url(${chatBg});
  background-size: auto;
  height: calc(100% - ${chatHeadersHeight}px - ${chatControlsHeight}px);
`;
export const ChatControlsStyled = styled.div`
  height: ${chatControlsHeight}px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
