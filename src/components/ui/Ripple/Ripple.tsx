import { NumericDictionaryIterator } from 'lodash';
import React, { useCallback, useState } from 'react';
import './Ripple.scss';
import debounce from 'lodash.debounce';
interface IRipple {
  x: number;
  y: number;
  size: number;
}

const Ripple = () => {
  const [ripples, setRipples] = useState<IRipple[]>([]);
  const clean = useCallback(
    debounce(() => {
      setRipples([]);
    }, 600),
    []
  );
  const handleClick = (e: React.MouseEvent) => {
    const parent = e.currentTarget as HTMLDivElement;
    const position = parent.getBoundingClientRect() as DOMRect;
    const rippleSize = parent.offsetWidth;
    setRipples([
      ...ripples,
      {
        x: e.clientX - position.x - rippleSize / 2,
        y: e.clientY - position.y - rippleSize / 2,
        size: rippleSize
      }
    ]);

    clean();
  };

  return (
    <div className="ripple-container" onClick={handleClick}>
      {ripples.map(({ x, y, size }, i) => {
        return (
          <span
            key={i}
            className="ripple-item"
            style={{
              top: `${y}px`,
              left: `${x}px`,
              width: `${size}px`,
              height: `${size}px`
            }}></span>
        );
      })}
    </div>
  );
};

export default Ripple;
