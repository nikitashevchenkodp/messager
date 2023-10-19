import React from 'react';

interface IAnimatedListProps {
  children: React.ReactNode | React.ReactNode;
}

export const AnimatedList = (props: IAnimatedListProps) => {
  const { children } = props;

  return children;
};
