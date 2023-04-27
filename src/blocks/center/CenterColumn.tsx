import ResizableContainer from 'components/ResizableContainer';
import Button from 'components/shared/Button';
import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getChatIsOpen } from 'store/selectors';
import CenterColumnHeader from './CenterColumnHeader';
import { CenterColumnContainer, CentralColumnContent } from './centerColumnStyled';
import { ChatList } from './chat-list';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import Modal from 'components/shared/Modal';
import { Form } from 'components/commonStyles';

const CenterColumn = () => {
  const isChatOpen = useAppSelector(getChatIsOpen);
  // const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <CenterColumnContainer isChatOpen={isChatOpen}>
        <ResizableContainer>
          <CenterColumnHeader />
          <CentralColumnContent>
            <ChatList />
            <Button
              style={{
                background: 'blue',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                position: 'absolute',
                bottom: '30px',
                right: '30px'
              }}>
              <AddCommentOutlinedIcon />
            </Button>
          </CentralColumnContent>
        </ResizableContainer>
        {/* <Modal active={isOpen} onClose={() => setIsOpen(false)}>
            <Form>
               <input type="text" />
            </Form>
        </Modal> */}
      </CenterColumnContainer>
    </>
  );
};

export default CenterColumn;
