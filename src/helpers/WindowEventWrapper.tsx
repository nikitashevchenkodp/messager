import React, { FC, useEffect } from 'react';

interface WindowEventProps {
  eventType: string;
  handler: (event: Event) => void;
  options?: boolean | AddEventListenerOptions;
}

const WindowEvent: FC<WindowEventProps> = ({ eventType, handler, options }) => {
  useEffect(() => {
    window.addEventListener(eventType, handler, options);
    return () => {
      window.removeEventListener(eventType, handler, options);
    };
  }, [eventType, handler, options]);

  return null;
};

export default WindowEvent;
