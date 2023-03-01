import { SM_SCREEN_WIDTH } from 'consts';
import styled from 'styled-components';

export const MainLayoutStyled = styled.div<{ isHideChatList: boolean }>`
  display: grid;
  grid-template-columns: 80px auto 1fr;
  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    grid-template-columns: ${(props) => (props.isHideChatList ? '80px 0 1fr' : '80px auto 0')};
  }
`;

export const Container = styled.div`
  position: relative;
`;
