import ResizableContainer from 'components/ResizableContainer';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { getChatIsOpen } from 'store/selectors';
import CenterColumnHeader from './CenterColumnHeader';
import { CenterColumnContainer, CentralColumnContent } from './centerColumnStyled';
import { ChatList } from './chat-list';

const CenterColumn = () => {
  const isChatOpen = useAppSelector(getChatIsOpen);

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
    </>
  );
};

export default CenterColumn;
