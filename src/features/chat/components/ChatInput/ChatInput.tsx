import React, { FC, forwardRef } from 'react';
import { Input, InputContainer, InputLabel } from './styled';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

const ChatInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { label, value, id, ...restProps } = props;

  const hideLabel = value.length > 0;

  return (
    <InputContainer>
      <InputLabel hideLabel={hideLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <Input {...restProps} value={value} id={id} ref={ref} />
    </InputContainer>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
