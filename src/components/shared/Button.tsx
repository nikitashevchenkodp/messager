import React, { forwardRef } from 'react';
import { ButtonBase } from './styled';

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    const { children, ...restProps } = props;
    return (
      <ButtonBase {...restProps} ref={ref}>
        {children}
      </ButtonBase>
    );
  }
);

Button.displayName = 'Button';

export default Button;
