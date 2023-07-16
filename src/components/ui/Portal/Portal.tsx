import React, { FC } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode | React.ReactNode[];
}

const Portal: FC<PortalProps> = ({ children }) => {
  return createPortal(children, document.querySelector('#portals') || document.body);
};

export default Portal;
