import React, { useState } from 'react';
import { GridContainer, MessageImage, MessageMedia } from './styled';
import Modal from 'components/Modal';
import { Attachment, IMediaItem } from 'types';

const MediaMessage = ({ media }: { media?: IMediaItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');

  return (
    <>
      {' '}
      <GridContainer>
        {media?.map((item: any, i: number) => (
          <MessageMedia
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
        <MessageImage src={src} />
      </Modal>
    </>
  );
};

export default MediaMessage;