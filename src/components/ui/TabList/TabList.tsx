import { usePrevious } from 'hooks/usePrevious';
import React, { ReactNode } from 'react';
import './TabList.scss';

interface ITabsListProps {
  children: ReactNode | ReactNode[];
  value: string | number;
  onChange: (value: number) => void;
}

export const TabList = (props: ITabsListProps) => {
  const { children: childrenProp, onChange, value } = props;

  const prevActive = usePrevious(value);

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return React.cloneElement(child, {
      ...child.props,
      isActive: value === child.props.value,
      prevActive: prevActive,
      onChange: onChange
    });
  });

  return <div className="TabList">{children}</div>;
};
