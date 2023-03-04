import { FOLDERS_WIDTH } from 'consts';
import styled from 'styled-components';

export const MainLayoutStyled = styled.div<{ isHideChatList: boolean }>`
  display: flex;
  max-width: 100vw;
`;
export const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  max-width: calc(100vw - ${FOLDERS_WIDTH}px);
  position: relative;
`;

export const Container = styled.div`
  position: relative;
`;
