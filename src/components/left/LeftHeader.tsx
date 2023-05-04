import Burger from 'components/ui/Burger';
import Button from 'components/ui/Button';
import SearchInput from 'components/ui/SearchInput';
import { log } from 'console';
import { useRef, useState } from 'react';

const LeftHeader = () => {
  const ref = useRef();
  console.log(ref);

  const [val, setVal] = useState('');

  return (
    <div className="left-header">
      <Button round width="3.5rem" height="3.5rem">
        <Burger />
      </Button>
      <SearchInput label="Search..." value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
};

export default LeftHeader;
