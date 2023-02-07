import React, { FC } from 'react';
import { Input, InputContainer, InputLabel } from './styled';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

const ChatInput: FC<SearchInputProps> = (props) => {
  const { label, value, id, ...restProps } = props;

  const hideLabel = value.length > 0;

  return (
    <InputContainer>
      <InputLabel hideLabel={hideLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <Input {...restProps} value={value} id={id} />
    </InputContainer>
  );
};

export default ChatInput;
