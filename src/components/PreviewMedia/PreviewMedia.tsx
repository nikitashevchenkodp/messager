import Button from 'components/shared/Button';
import React, { FC, useState } from 'react';
import {
  Body,
  Container,
  Footer,
  Header,
  ImageListItem,
  ImagesList,
  PrimaryButton,
  Title
} from './styled';
import CloseIcon from '@mui/icons-material/Close';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatInput from 'blocks/chat/components/ChatInput/ChatInput';
import Divider from 'components/shared/Divider';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getActiveChatId, getCurrentUserId } from 'store/selectors';
interface PreviewMedia {
  files?: FileList;
  onClose: () => void;
}

const PreviewMedia: FC<PreviewMedia> = ({ files, onClose }) => {
  const [val, setVal] = useState('');
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(getCurrentUserId);
  const chatId = useAppSelector(getActiveChatId);
  const onSend = () => {
    dispatch({
      type: 'sendMessage',
      payload: {
        from: currentUserId,
        chatId: chatId || '',
        text: val,
        files
      }
    });
  };

  return (
    <Container>
      <Header>
        <Button onClick={onClose}>
          <CloseIcon />
        </Button>
        <Title>Send {Array.from(files || []).length} photos</Title>
      </Header>
      <Divider />
      <Body>
        <ImagesList>
          {Array.from(files || []).map((file) => {
            return (
              <ImageListItem key={file?.name}>
                <img src={URL.createObjectURL(file)} />;
              </ImageListItem>
            );
          })}
        </ImagesList>
      </Body>
      <Divider />

      <Footer>
        <Button>
          <SentimentSatisfiedAltIcon />
        </Button>
        <ChatInput label="Add caption" value={val} onChange={(e) => setVal(e.target.value)} />
        <PrimaryButton onClick={onSend}>Send</PrimaryButton>
      </Footer>
    </Container>
  );
};

export default PreviewMedia;
