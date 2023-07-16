import React, { FC, useState } from 'react';
import { Footer, Title } from './styled';
import './PreviewMedia.scss';
import Divider from 'components/ui/Divider';
import Button from 'components/ui/Button';
import MessageInput from 'components/ui/MessageInput';
interface PreviewMedia {
  files: FileList | null;
  onClose: () => void;
  msgText: string;
  setMsgText: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
}

const PreviewMedia: FC<PreviewMedia> = ({ files, onClose, setMsgText, msgText, submit }) => {
  console.log('rerender preview');

  return (
    <div className="Preview-media">
      <div className="Preview-media-header">
        <Button round onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </Button>
        <Title>Send {Array.from(files || []).length} photos</Title>
      </div>
      <Divider />
      <div className="Preview-media-body">
        <div className="image-list">
          {Array.from(files || []).map((file) => {
            return (
              <div className="image-list-item" key={file?.name}>
                <img src={URL.createObjectURL(file)} />;
              </div>
            );
          })}
        </div>
      </div>
      <Divider />

      <Footer>
        <Button>
          <span className="material-symbols-outlined">mood</span>{' '}
        </Button>
        <MessageInput
          value={msgText}
          onInput={(e) => {
            setMsgText((e.target as any).innerText);
          }}
        />
        <Button color="primary" width="70px" height="35px" onClick={submit}>
          Send
        </Button>
      </Footer>
    </div>
  );
};

export default PreviewMedia;
