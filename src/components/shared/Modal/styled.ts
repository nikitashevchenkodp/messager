import { BreakfastDiningRounded } from '@mui/icons-material';
import styled from 'styled-components';

export const ModalWindow = styled.div<{ active: boolean }>`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.active ? '1' : '0')};
  pointer-events: ${(props) => (props.active ? 'all' : 'none')};
  transition: 0.2s;
  z-index: 100;
`;

export const ModalWindowContent = styled.div<{
  active: boolean;
  appearsFrom?: 'bottom' | 'right' | 'left' | 'top';
}>`
  max-width: 90%;
  margin: 0 auto;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: ${({ active, appearsFrom = 'right' }) => {
    if (active) return 'none';
    switch (appearsFrom) {
      case 'bottom':
        return 'translateY(50%);';
      case 'right':
        return 'translateX(50%);';
      case 'left':
        return 'translateX(-50%);';
      case 'top':
        return 'translateY(-50%);';
    }
  }};
  transition: 0.2s;
  color: black;
`;
