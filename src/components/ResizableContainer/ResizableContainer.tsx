import Resizer from 'components/Resizer/Resizer';
import { CHAT_LIST_MIN_WIDTH, CHAT_LIST_WIDTH_COLAPSED } from 'consts';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import styled from 'styled-components';

interface ResizableContainerStyledProps {
  readonly defaultWidth?: number;
}

export const ResizableContainerStyled = styled.div`
  width: '350px';
  max-width: 100%;
`;

interface IResizableContainer {
  children: React.ReactNode | React.ReactNode[];
}

const ResizableContainer: FC<IResizableContainer> = (props) => {
  const { children } = props;
  const chatListWidth = useAppSelector((state) => state.ui.uiSettings.chatListWidth);

  return (
    <>
      <ResizableContainerStyled style={{ width: `${chatListWidth}px` }}>
        {children}
      </ResizableContainerStyled>
      <Resizer
        minWidth={CHAT_LIST_MIN_WIDTH}
        edgeCaseWidth={CHAT_LIST_WIDTH_COLAPSED}
        delayInPixels={50}
      />
    </>
  );
};

export default ResizableContainer;
