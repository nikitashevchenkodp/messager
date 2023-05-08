import classNames from 'classnames';
import React, { FC, forwardRef } from 'react';
import Ripple from '../Ripple';
import './Button.scss';

type ButtonTypes = 'button' | 'a';

type ButtonProps<Type extends ButtonTypes | React.ComponentType<any>> = {
  round?: boolean;
  hasRipple?: boolean;
  as?: Type;
  color: 'primary' | 'secondary' | 'error' | 'transparent';
  width?: string;
  height?: string;
} & ButtonAditionalPropsType<Type>;

type ButtonAditionalPropsType<T extends ButtonTypes | React.ComponentType> =
  T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : React.ComponentPropsWithoutRef<T>;

const Button = forwardRef(
  <Type extends ButtonTypes | React.ComponentType<any> = 'button'>(
    props: ButtonProps<Type>,
    ref: React.ComponentPropsWithRef<Type>['ref']
  ) => {
    const {
      as,
      children,
      width,
      height,
      round = false,
      color = 'transparent',
      hasRipple = true,
      ...rest
    } = props;
    const Component = as || 'button';
    const btnClasses = classNames({
      btn: true,
      'btn--round': round,
      'btn--primary': color === 'primary'
    });

    return (
      <Component
        ref={ref}
        className={btnClasses}
        style={{ width: width, height: height }}
        {...rest}>
        {children}
        {hasRipple ? <Ripple /> : null}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
