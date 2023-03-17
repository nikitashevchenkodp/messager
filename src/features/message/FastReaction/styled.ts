import styled from 'styled-components';

export const FastReactionContainer = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -8px;
  ${(props) => {
    if (props.position === 'left') {
      return `left: -8px;`;
    } else {
      return `right: -8px;`;
    }
  }}
  width: 24px;
  height: 24px;
  opacity: 0;
  transform: scale(0.7);
  transition: 0.2s;
  cursor: pointer;
  z-index: 100;
  &:hover {
    transition: 0.2s;
    opacity: 1;
    transform: scale(1);
  }
`;
