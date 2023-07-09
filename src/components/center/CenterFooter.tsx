import Button from 'components/ui/Button';
import MessageInput from 'components/ui/MessageInput';
import { useSocketContext } from 'contexts/SocketContexts';
import React, { FC, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { IChat, IMessage } from 'store/interfaces';
let id = 0;

interface ICenterFooterProps {
  activeChat: IChat;
}

const CenterFooter: FC<ICenterFooterProps> = ({ activeChat }) => {
  const [val, setVal] = useState('');
  const user = useAppSelector((state) => state.user.user);
  const chatId = useAppSelector((state) => state.ui.activeChat.id);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { sendMessage, typing } = useSocketContext();

  const onChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    setVal((e.target as HTMLDivElement).innerText);
    typing(chatId, true);
    timerRef.current = setTimeout(() => {
      typing(chatId, false);
    }, 2000);
  };

  const submit = () => {
    const msgText = val.trim();
    if (!msgText.length) return;
    const newMessage: IMessage = {
      id: `${id++}`,
      chatId: activeChat.id,
      content: {
        text: msgText
      },
      createdAt: new Date().toISOString(),
      edited: false,
      from: {
        id: user._id,
        fullName: user.fullName,
        avatar: user.avatar
      },
      readed: false,
      status: 'pending'
    };
    sendMessage(newMessage);
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
