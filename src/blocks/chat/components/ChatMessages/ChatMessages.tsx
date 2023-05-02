/* eslint-disable react/prop-types */
import { messagesActions } from 'blocks/chat/redux/chat';
import Message from 'blocks/message/Message/Message';
import debounce from 'lodash.debounce';
import React, { FC, memo, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IMessage } from 'types';
import {
  ChatMessagesStyled,
  DateGroupContainer,
  DateLabel,
  DateLabelContainer,
  NotMessages
} from './styled';
import { formatToHumanDate } from 'helpers/formatToHumanDate';
import { groupMessages } from 'helpers/groupMessages';
import {
  getActiveChatId,
  getActiveChatMessages,
  getActiveChatMessagesIds,
  getScrollOffsetByChatId
} from 'store/selectors';
import DragableZone from '../DragableZone/DragableZone';

interface IChatMessagesProps {
  openMessageMenu: (e: React.MouseEvent, message: IMessage) => void;
}

const ChatMessages: FC<IChatMessagesProps> = memo(({ openMessageMenu }) => {
  const dispatch = useAppDispatch();

  const activeChatId = useAppSelector(getActiveChatId);
  const messagesIds = useAppSelector(getActiveChatMessagesIds);
  const messages = useAppSelector(getActiveChatMessages);
  const messagesIdsInQueue = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId]?.sentQueue.messagesIds
  );
  const messagesByIdInQueue = useAppSelector(
    (state) => state.entities.messages.byChatId[activeChatId]?.sentQueue.messagesById
  );
  const scrolOffset = useAppSelector(getScrollOffsetByChatId);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef?.current) {
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
        console.log('scroll');

        listRef.current.scrollTo({
          top: listRef!.current!.scrollHeight!,
          behavior: 'smooth'
        });
      }
    }
  }, [messagesIds]);

  const messagesGroups = useMemo<ReturnType<typeof groupMessages> | undefined>(() => {
    if (!messagesIds?.length) return;
    return groupMessages({ ...messages, ...messagesByIdInQueue }, [
      ...messagesIds,
      ...messagesIdsInQueue
    ]);
  }, [messagesIds, messagesIdsInQueue, messages, messagesByIdInQueue]);

  const renderedMessages = useMemo(() => {
    if (!messagesGroups) return;
    return Object.keys(messagesGroups).map((date, i) => {
      return (
        <DateGroupContainer key={date + i}>
          <DateLabelContainer key={date}>
            <DateLabel>{formatToHumanDate(date)}</DateLabel>
          </DateLabelContainer>
          {messagesGroups[date]
            .map((senderGroup) => {
              return senderGroup
                .map((message, i, arr) => {
                  const firstInGroup = i === 0;
                  const lastInGroup = i === arr.length - 1;
                  return (
                    <Message
                      message={message}
                      messageId={message._id}
                      key={message._id}
                      openMessageMenu={openMessageMenu}
                      firstInGroup={firstInGroup}
                      lastInGroup={lastInGroup}
                    />
                  );
                })
                .flat(Infinity);
            })
            .flat(Infinity)}
        </DateGroupContainer>
      );
    });
  }, [messagesGroups]);
  console.log('RE RENDER MESSAGES');

  return (
    <ChatMessagesStyled data-testid="chat-messages" ref={listRef}>
      {!messagesIds?.length ? (
        <NotMessages>
          No messages here yet... Send a message or tap on the greeting below.
        </NotMessages>
      ) : (
        <div
          ref={listRef}
          style={{
            height: 'auto',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
          {renderedMessages}
        </div>
      )}
    </ChatMessagesStyled>
  );
});

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
