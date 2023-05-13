import Button from 'components/ui/Button';
import MessageInput from 'components/ui/MessageInput';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IMessage } from 'store/interfaces';
import { messagesActions } from 'store/slices';

const CenterFooter = () => {
  const [val, setVal] = useState('');
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.ui.activeChat.id);
  const onChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setVal((e.target as HTMLDivElement).innerText);
  };

  const submit = () => {
    if (!val.length) return;
    const newMessage: IMessage = {
      id: '351',
      chatId: activeChatId,
      content: {
        text: val
      },
      createdAt: new Date().toISOString(),
      edited: false,
      from: {
        id: '000',
        fullName: 'Nikita Shevchenko',
        avatar: ''
      }
    };
    dispatch(messagesActions.addNewMessage(newMessage));
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
      <Button round width="4rem" height="4rem" onClick={submit}>
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
