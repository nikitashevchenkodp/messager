import styled from 'styled-components';
import { CHAT_HEADER_HEIGHT, SM_SCREEN_WIDTH } from 'consts';
import Button from 'components/shared/Button';

export const ChatHeaderStyled = styled.div`
  height: ${CHAT_HEADER_HEIGHT}px;
  background-color: #fff;
  padding: 10px 15px;
`;
export const ChatHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const ChatTitle = styled.h4`
  font-weight: 700;
  font-size: 15px;
`;

export const ChatExtraInfo = styled.div`
  color: rgb(154, 154, 154);
  font-size: 15px;
`;

export const ChatActions = styled.div`
  display: flex;
  gap: 20px;
`;

export const BackButton = styled(Button)`
  display: none;

  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    display: block;
  }
`;
