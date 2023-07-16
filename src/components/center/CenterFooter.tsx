import Button from 'components/ui/Button';
import MessageInput from 'components/ui/MessageInput';
import { useSocketContext } from 'contexts/SocketContexts';
import React, { FC, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { IChat, IMessage } from 'store/interfaces';
import { clodinaryService } from 'services/cloudinaryService';
import DropZone from 'components/ui/DropZone/DropZone';
import Modal from 'components/ui/Modal';
import PreviewMedia from './PreviewMedia';

let id = 0;

interface ICenterFooterProps {
  activeChat: IChat;
  isDropZoneActive: boolean;
  onHide: () => void;
}

const CenterFooter: FC<ICenterFooterProps> = ({ activeChat, isDropZoneActive, onHide }) => {
  const [val, setVal] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const chatId = useAppSelector((state) => state.ui.activeChat.id);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { sendMessage, typing } = useSocketContext();

  const [file, setFile] = useState<FileList | null>(null);

  const onDrop = (files?: FileList) => {
    setFile(files || null);
    setIsModalOpen(true);
  };

  const onChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    setVal((e.target as HTMLDivElement).innerText);
    typing(chatId, true);
    timerRef.current = setTimeout(() => {
      typing(chatId, false);
    }, 2000);
  };

  const uploadAttachments = async (files: FileList | null) => {
    if (!files?.length) return;
    const filesArr = Array.from(files);
    const res = await Promise.all(
      filesArr.map((file) => {
        return clodinaryService.uploadImg(file);
      })
    );
    return res.map((item) => item.secure_url);
  };

  const submit = async () => {
    let res;
    if (file) {
      res = await uploadAttachments(file);
    }
    const msgText = val.trim();
    if (!msgText.length) return;
    const newMessage: IMessage = {
      id: `${id++}`,
      chatId: activeChat.id,
      content: {
        text: msgText,
        attachments: res
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
    console.log(newMessage);
    setIsModalOpen(false);
    setVal('');
    setFile(null);
    sendMessage(newMessage);
  };
  console.log(val);

  return (
    <>
      <div className="center-footer">
        <Button round>
          <span className="material-symbols-outlined">sentiment_satisfied</span>{' '}
        </Button>
        <MessageInput value={val} onInput={onChange} />
        <Button round>
          <span className="material-symbols-outlined rotate-45">
            attach_file
            {/* <input id="attach_files" type="file" hidden /> */}
          </span>
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
      <DropZone isOpen={isDropZoneActive} onHide={onHide} onDrop={onDrop} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PreviewMedia
          onClose={() => setIsModalOpen(false)}
          files={file}
          msgText={val}
          setMsgText={setVal}
          submit={submit}
        />
      </Modal>
    </>
  );
};

export default CenterFooter;
