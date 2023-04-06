import React, { FC, forwardRef } from 'react';
import { CloseIcon } from 'components/icons';
import { Input, InputContainer, InputIconEnd, InputLabel } from './styled';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { label, value, id, ...restProps } = props;

  const hideLabel = value.length > 0;

  return (
    <InputContainer>
      <InputLabel hideLabel={hideLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <Input {...restProps} value={value} id={id} ref={ref} />
      <InputIconEnd hideLabel={hideLabel}>
        <CloseIcon width="13px" height="13px" />
      </InputIconEnd>
    </InputContainer>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
