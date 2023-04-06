import styled from 'styled-components';

export const MenuBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export const MenuContainer = styled.div`
  display: flex;
`;
