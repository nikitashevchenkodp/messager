import { CHAT_AREA_WIDTH, SM_SCREEN_WIDTH } from 'consts';
import styled, { keyframes } from 'styled-components';

export const CenterColumnHeaderStyled = styled.div`
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

export const CenterColumnContainer = styled.div<{ isChatOpen: boolean }>`
  background-color: #fff;
  border-right: 1px solid grey;
  position: relative;
  height: 100vh;
  overflow: hidden;
  /* max-width: calc(100% - ${CHAT_AREA_WIDTH}px); */
  max-width: 40vw;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    pointer-events: none;
    z-index: 5;
  }

  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    transition: 0.3s;
    width: 100%;
    max-width: 100%;
    transform: ${(props) => (props.isChatOpen ? 'translateX(-100px)' : '0')};
    max-width: ${(props) => (props.isChatOpen ? '0' : '100vw')};
    &:after {
      transition: all 0.5s;
      opacity: ${(props) => (props.isChatOpen ? '1' : '0')};
    }
  }
`;

export const CentralColumnContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  position: relative;
  padding-top: 60px;
`;
export const CenterColumnContainerSmallScreen = styled.div<{ isHide: boolean }>`
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
