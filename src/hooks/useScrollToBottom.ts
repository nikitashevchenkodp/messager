import { useEffect, useLayoutEffect, useRef } from 'react';

export const useScrollToBottom = (...args: any[]) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [...args]);

  return scrollRef;
};
