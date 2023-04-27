import React, { FC, useState } from 'react';

interface IDragableZoneProps {
  children: React.ReactNode | React.ReactNode[];
  onDrop?: (files: FileList) => void;
}

const DragableZone: FC<IDragableZoneProps> = ({ children, onDrop }) => {
  const [isDraging, setIsDraging] = useState(false);
  console.log('render', isDraging);

  const dragHandler = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('drag');
  };
  const dragOverhandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraging(true);
    console.log('dragOverhandler');
  };
  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop?.(e.dataTransfer.files);
    setIsDraging(false);
  };

  return (
    <div
      onDrag={dragHandler}
      onDragOver={dragOverhandler}
      onDrop={dropHandler}
      onDragEnd={() => console.log('dragEnd')}
      onDragLeave={() => setIsDraging(false)}
      style={{ height: '100%', width: '100%' }}>
      <div
        style={{
          opacity: isDraging ? 1 : 0,
          visibility: isDraging ? 'visible' : 'hidden',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(8px)',
          transition: '0.3s',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div
          style={{
            position: 'relative',
            width: '60%',
            height: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <i
            style={{
              border: '2px solid rgb(65,159,217)',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              borderRadius: '40% 60% 70% 30% / 30% 30% 70% 70%',
              animation: 'rotate 6s linear infinite',
              filter: 'drop-shadow(0 0 30px rgb(65,159,217))'
            }}></i>
          <i
            style={{
              border: '2px solid rgb(65,159,217)',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              borderRadius: '70% 30% 35% 65% / 30% 30% 70% 70%',
              animation: 'rotate 4s linear infinite',
              filter: 'drop-shadow(0 0 30px rgb(65,159,217))'
            }}></i>
          <i
            style={{
              border: '2px solid rgb(65,159,217)',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              borderRadius: '70% 30% 80% 20% / 30% 69% 31% 70%',
              animation: 'rotateReverse 10s linear infinite',
              filter: 'drop-shadow(0 0 30px rgb(65,159,217))'
            }}></i>
          <div
            style={{
              width: '70%',
              height: '70%',
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '40px',
              animation: 'zoom 300ms linear ',
              animationIterationCount: '1'
            }}>
            Drop files here
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default DragableZone;
