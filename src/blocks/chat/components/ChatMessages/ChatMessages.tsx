import { messagesActions } from 'blocks/chat/redux/chat';
import Message from 'blocks/message/Message/Message';
import debounce from 'lodash.debounce';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styled from 'styled-components';
import { ChatMessagesStyled } from './styled';

const NotMessages = styled.div`
  width: 170px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const ChatMessages = memo(({ openMessageMenu }: any) => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);

  const messagesIds = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId || '']?.messagesIds
  );

  const scrolOffset = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId].lastScrollOffset
  );

  const listRef = useRef<HTMLDivElement | null>(null);
  console.log('render chat messages');

  useEffect(() => {
    if (listRef?.current) {
      console.log('initial scroll');

      const point =
        listRef.current.scrollHeight - (scrolOffset || 0) - listRef.current.offsetHeight;
      listRef.current.scrollTo(0, point);
    }

    const handleScroll = debounce((e: Event) => {
      const scrollHeight = (e.target as HTMLDivElement).scrollHeight;
      const offsetBottom =
        scrollHeight -
        (e.target as HTMLDivElement).scrollTop -
        (e.target as HTMLDivElement).offsetHeight;
      dispatch(messagesActions.setLastScrollOffset({ chatId: activeChatId, offset: offsetBottom }));
    }, 100);

    listRef?.current?.addEventListener('scroll', handleScroll);

    return () => {
      listRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [activeChatId]);

  useEffect(() => {
    if (Number(scrolOffset) <= 1) {
      if (listRef?.current) {
        listRef.current.scrollTo({
          top: listRef!.current!.scrollHeight!,
          behavior: 'smooth'
        });
      }
    }
  }, [messagesIds]);

  const messages = useMemo(() => {
    if (!messagesIds?.length) {
      return (
        <NotMessages>
          No messages here yet... Send a message or tap on the greeting below.
        </NotMessages>
      );
    }
    return messagesIds?.map((id: string) => {
      return <Message messageId={id} key={id} openMessageMenu={openMessageMenu} />;
    });
  }, [messagesIds]);

  return (
    <ChatMessagesStyled data-testid="chat-messages" ref={listRef}>
      <div
        ref={listRef}
        style={{ height: 'auto', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
        {messages}
      </div>
    </ChatMessagesStyled>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
