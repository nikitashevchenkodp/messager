import Button from 'components/shared/Button';
import { SnackbarContent, SnackbarMessage } from 'notistack';
import React, { forwardRef } from 'react';
import { useAppDispatch } from 'store/hooks';
import { snackbarActions } from 'store/slices/snackbar';
import { Author, Avatar, Content, MessageText, NotificationContainer, TextContent } from './styled';

const MessageNotification = forwardRef<HTMLDivElement, any>((props, ref) => {
  console.log(props);

  return (
    <SnackbarContent ref={ref} style={{ minWidth: 0 }}>
      <NotificationContainer>
        <Button>x</Button>
        <Content>
          <Avatar />
          <TextContent>
            <Author></Author>
            <MessageText></MessageText>
          </TextContent>
        </Content>
      </NotificationContainer>
      ;
    </SnackbarContent>
  );
});

MessageNotification.displayName = 'MessageNotification';

export default MessageNotification;
