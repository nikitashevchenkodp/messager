import React, { FC, forwardRef, HTMLAttributes } from 'react';
import styled from 'styled-components';

const InputLabel = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: var(--offsetLeft);
  z-index: -1;
  color: #9e9e9e;
  transition: 0.3s;
  font-size: var(--labelFontSizeFull);
  padding: 1px 3px;
`;

const Inputfield = styled.input`
  width: 100%;
  padding: 0 0 10px 0;
  background-color: transparent;
  outline: none;
  transition: 0.3s;
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 0 var(--offsetLeft);
  height: var(--height);
  font-size: inherit;
  &:focus {
    border: 1px solid var(--blue);
  }
  &:not(:placeholder-shown) ~ ${InputLabel} {
    top: 0;
    font-size: var(--labelFontSizeSmall);
    color: var(--blue);
    background-color: var(--white);
    z-index: 10;
  }
  &:focus ~ ${InputLabel} {
    top: 0;
    font-size: var(--labelFontSizeSmall);
    color: var(--blue);
    background-color: var(--white);
    z-index: 10;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px var(--background) inset;
  }
`;

const InputContainer = styled.div`
  --blue: #1e90ff;
  --white: #ffffff;
  --gray: #9e9e9e;
  --offsetLeft: 8px;
  --labelFontSizeFull: 16px;
  --labelFontSizeSmall: 13px;
  --height: 44px;
  --background: var(--white);
  position: relative;
  width: 100%;
  font-size: 16px;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...restProps } = props;
  return (
    <InputContainer>
      <Inputfield {...restProps} placeholder=" " ref={ref} />
      <InputLabel>{label}</InputLabel>
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
