import { messagesActions } from 'blocks/chat/redux/chat';
import Message from 'blocks/message/Message/Message';
import { useScrollToBottom } from 'hooks/useScrollToBottom';
import debounce from 'lodash.debounce';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
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
  console.log('rerender');

  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((state) => state.entities.active.activeChat?.chatId);
  const messagesIds = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId || '']?.messagesIds
  );
  const selectedMessagesIds = useAppSelector(
    (state) => state.entities.active.activeChat.selectedMessagesIds
  );
  const scrolOffset = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId].lastScrollOffset
  );
  // const scrollRef = useScrollToBottom(messagesIds);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isSelectedModeOn = Object.keys(selectedMessagesIds).length > 0;

  useEffect(() => {
    console.log('scrollHeight', listRef?.current?.scrollHeight);
    console.log('scrolOffset', scrolOffset);
    console.log('when to scroll', listRef!.current!.scrollHeight! - (scrolOffset || 0));
    const point =
      listRef!.current!.scrollHeight! - (scrolOffset || 0) - listRef!.current!.offsetHeight;
    if (listRef?.current) {
      listRef.current.scrollTo(0, point);
    }

    const handleScroll = debounce((e: Event) => {
      const scrollHeight = (e.target as HTMLDivElement).scrollHeight;
      const offsetBottom =
        scrollHeight -
        (e.target as HTMLDivElement).scrollTop -
        (e.target as HTMLDivElement).offsetHeight;
      dispatch(messagesActions.setLastScrollOffset({ chatId: activeChatId, offset: offsetBottom }));
      console.log(offsetBottom);
    }, 100);
    if (listRef?.current) {
      listRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listRef?.current) {
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeChatId]);

  useEffect(() => {
    console.log('scrolOffset', scrolOffset);

    if (Number(scrolOffset) <= 1) {
      console.log('true');

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
    return messagesIds?.map((id: string, idx: number) => {
      return (
        <Message
          toggleFromSelected={
            isSelectedModeOn
              ? () => dispatch(activeEntitiesActions.toggleItemInSelectedMessagesIds(id))
              : undefined
          }
          selected={Boolean(selectedMessagesIds[id])}
          messageId={id}
          // ref={idx === messagesIds.length - 1 ? scrollRef : null}
          key={id}
          openMessageMenu={openMessageMenu}
        />
      );
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
