import classNames from 'classnames';
import React, { FC } from 'react';
import './SearchInput.scss';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isLoading?: boolean;
}

const SearchInput: FC<IInputProps> = (props) => {
  const { value, id, name, label, isLoading = false, ...rest } = props;

  const labelClasses = classNames({
    'search-label': true,
    'search-label--hide': !!value?.toString().length
  });
  const closeIconClasses = classNames({
    'material-symbols-outlined close-icon': true,
    'close-icon--hide': !value?.toString().length
  });

  return (
    <div className="search-input">
      <label className={labelClasses} htmlFor={id}>
        {label}
      </label>
      <input name={name} id={id} value={value} type="text" {...rest} />
      <span className="material-symbols-outlined search-icon">search</span>
      <span className={closeIconClasses}>close</span>
    </div>
  );
};

export default SearchInput;
