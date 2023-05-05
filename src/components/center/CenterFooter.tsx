import Button from 'components/ui/Button';
import MessageInput from 'components/ui/MessageInput';
import React, { useRef, useState } from 'react';

const CenterFooter = () => {
  const [val, setVal] = useState('');

  const onChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setVal((e.target as HTMLDivElement).innerText);
  };

  return (
    <div className="center-footer">
      <Button round>
        <span className="material-symbols-outlined">sentiment_satisfied</span>{' '}
      </Button>
      <MessageInput value={val} onInput={onChange} />
      <Button round>
        <span className="material-symbols-outlined rotate-45">attach_file</span>
      </Button>
      <Button round width="4rem" height="4rem">
        <span className={`material-symbols-outlined changable ${val.length ? '' : 'hide'}`}>
          send
        </span>
        <span className={`material-symbols-outlined changable ${val.length ? 'hide' : ''}`}>
          mic
        </span>
      </Button>
    </div>
  );
};

export default CenterFooter;
