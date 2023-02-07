import styled from 'styled-components';
import { CHAT_CONTROLS_HEIGHT } from '../../../consts';

export const ChatControlsContainer = styled.div`
  height: ${CHAT_CONTROLS_HEIGHT}px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr 50px 50px;
  align-items: center;
`;
