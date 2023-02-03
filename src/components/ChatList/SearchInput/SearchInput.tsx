import React, { FC } from 'react';
import { CloseIcon } from '../../icons';
import { Input, InputContainer, InputIconEnd, InputLabel } from './styled';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { label, value, id, ...restProps } = props;

  const hideLabel = value.length > 0;

  return (
    <InputContainer>
      <InputLabel hideLabel={hideLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <Input {...restProps} value={value} id={id} />
      <InputIconEnd hideLabel={hideLabel}>
        <CloseIcon width="13px" height="13px" />
      </InputIconEnd>
    </InputContainer>
  );
};

export default SearchInput;
