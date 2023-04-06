import styled from 'styled-components';

const inputOffsetLeft = 8;

export const InputContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
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
  z-index: 0;
  font-size: 15px;
  font-weight: 500;
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 3px;
  background-color: transparent;
  padding-left: ${inputOffsetLeft}px;
  font-size: 18px;
  transition: 0.2s;
  position: relative;
  z-index: 1;
`;
