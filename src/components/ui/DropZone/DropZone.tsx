import React, { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './DropZone.scss';

interface IDragableZoneProps {
  onDrop?: (files: FileList) => void;
  isOpen: boolean;
  onHide: () => void;
}

const DropZone: FC<IDragableZoneProps> = ({ onDrop, isOpen, onHide }) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const dragOverhandler = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop?.(e.dataTransfer.files);
    onHide();
    console.log('dropped');
  };
  const onDragLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('onDragLeave');

    onHide();
  };

  return (
    <CSSTransition in={isOpen} classNames="Dropzone" timeout={300} nodeRef={ref} component="div">
      <div className="Dropzone" ref={ref}>
        <div
          onDragOver={dragOverhandler}
          onDrop={dropHandler}
          onDragLeave={onDragLeave}
          className="Dropzone-overlay">
          <div className="Dropzone-content">Drop files here</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default DropZone;
