import ResizableContainer from 'components/ResizableContainer';
import Resizer from 'components/Resizer/Resizer';
import { CHAT_LIST_MIN_WIDTH, CHAT_LIST_WIDTH_COLAPSED } from 'consts';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import CenterColumnHeader from './CenterColumnHeader';
import {
  CenterColumnContainer,
  CenterColumnContainerSmallScreen,
  CentralColumnContent
} from './centerColumnStyled';
import { ChatList } from './chat-list';

const CenterColumn = () => {
  const isChatOpen = useAppSelector((state) => state.ui.uiSettings.isChatOpen);
  const chatListWidth = useAppSelector((state) => state.ui.uiSettings.chatListWidth);

  return (
    <>
      <CenterColumnContainer isChatOpen={isChatOpen}>
        <ResizableContainer>
          <CenterColumnHeader />
          <CentralColumnContent>
            <ChatList />
          </CentralColumnContent>
        </ResizableContainer>
      </CenterColumnContainer>

      {/* 
      <CenterColumnContainerSmallScreen isHide={isHideChatList}>
        <CenterColumnHeader />
        <CentralColumnContent>Content</CentralColumnContent>
      </CenterColumnContainerSmallScreen> */}
    </>
  );
};

export default CenterColumn;
