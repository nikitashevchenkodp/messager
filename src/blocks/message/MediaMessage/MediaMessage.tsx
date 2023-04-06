import React, { useState } from 'react';
import { GridContainer, MessageImage, MessageMedia } from './styled';
import Modal from 'components/shared/Modal';
import { Attachment, IMediaItem } from 'types';

const MediaMessage = ({ media }: { media?: IMediaItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');

  return (
    <>
      <GridContainer>
        {media?.map((item: any, i: number) => (
          <MessageMedia
            data-testid="message-media-item"
            key={i}
            onClick={() => {
              setSrc(item.src);
              setIsOpen(true);
            }}>
            <MessageImage src={item.src} />
          </MessageMedia>
        ))}
      </GridContainer>
      <Modal active={isOpen} onClose={() => setIsOpen(false)}>
        <MessageImage data-testid="message-media-fullscreen" src={src} />
      </Modal>
    </>
  );
};

export default MediaMessage;
