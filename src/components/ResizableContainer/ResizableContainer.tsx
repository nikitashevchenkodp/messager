import Resizer from 'components/Resizer/Resizer';
import { CHAT_LIST_MIN_WIDTH, CHAT_LIST_WIDTH_COLAPSED, SM_SCREEN_WIDTH } from 'consts';
import React, { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import styled from 'styled-components';

interface ResizableContainerStyledProps {
  readonly defaultWidth?: number;
}

export const ResizableContainerStyled = styled.div<{ isChatOpen: boolean }>`
  max-width: 100%;
  height: 100%;
  transition: none;
  @media screen and (max-width: ${SM_SCREEN_WIDTH}px) {
    width: ${(props) => !props.isChatOpen && '100% !important'};
  }
`;

interface IResizableContainer {
  children: React.ReactNode | React.ReactNode[];
}

const ResizableContainer: FC<IResizableContainer> = (props) => {
  const { children } = props;
  const chatListWidth = useAppSelector((state) => state.ui.uiSettings.chatListWidth);
  const isChatOpen = useAppSelector((state) => state.ui.uiSettings.isChatOpen);

  return (
    <>
      <ResizableContainerStyled isChatOpen={isChatOpen} style={{ width: `${chatListWidth}px` }}>
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
