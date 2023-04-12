import { useEffect, useLayoutEffect, useRef } from 'react';
declare global {
  interface Window {
    ref: any;
  }
}
export const useScrollToBottom = (...args: any[]) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    console.log(scrollRef.current);
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [...args, scrollRef.current]);

  return scrollRef;
};
