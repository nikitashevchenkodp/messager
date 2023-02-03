import styled from 'styled-components';

const inputOffsetLeft = 8;
const inputOffsetRight = 14;

export const InputContainer = styled.div`
  height: 38px;
  width: 100%;
  position: relative;
`;
export const InputIconEnd = styled.div<{ hideLabel: boolean }>`
  display: 'flex';
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transition: 0.3s;
  transform: translateY(-50%) rotate(0) scale(0.1);
  right: ${inputOffsetRight}px;
  cursor: pointer;
  overflow: 'hidden';
  transform: ${(props) => (props.hideLabel ? 'translateY(-50%) rotate(360deg) scale(1)' : '0')};
  opacity: ${(props) => (props.hideLabel ? '1' : '0')};
`;

export const InputLabel = styled.label<{ hideLabel: boolean }>`
  color: rgb(153, 153, 153);
  position: absolute;
  left: ${inputOffsetLeft + 4}px;
  top: 50%;
  transition: 0.2s;
  transform: translateY(-50%);
  transform: ${(props) => (props.hideLabel ? 'translate(100%, -50%)' : '0')};
  opacity: ${(props) => (props.hideLabel ? '0' : '1')};
  visibility: ${(props) => (props.hideLabel ? 'hidden' : 'visible')};

  font-size: 15px;
  font-weight: 500;
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 3px;
  background-color: rgb(241, 241, 241);
  border: 2px solid rgb(241, 241, 241);
  padding-left: ${inputOffsetLeft}px;
  font-size: 18px;

  transition: 0.2s;
  &:focus {
    border: 2px solid rgb(84, 195, 243);
    background-color: transparent;
  }
`;
