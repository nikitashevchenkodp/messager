import React from 'react';

const MuiIconWrapper = ({
  styles,
  children
}: {
  styles: React.CSSProperties;
  children: React.ReactNode;
}) => {
  return <div style={styles}>{children}</div>;
};

export default MuiIconWrapper;
