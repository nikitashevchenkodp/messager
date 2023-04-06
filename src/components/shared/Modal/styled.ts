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

export const ModalWindowContent = styled.div<{ active: boolean }>`
  max-width: 90%;
  margin: 0 auto;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: ${(props) => (props.active ? 'none' : 'translateX(50%)')};
  transition: 0.2s;
  color: black;
`;
