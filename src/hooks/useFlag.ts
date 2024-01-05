import { useState } from 'react';

export const useFlag = (init = false): [boolean, () => void, () => void] => {
  const [isTrue, setIsTrue] = useState(init);

  const setTrue = () => setIsTrue(true);
  const setFalse = () => setIsTrue(false);

  return [isTrue, setFalse, setTrue];
};
