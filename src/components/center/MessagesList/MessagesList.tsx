/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createRef,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { formatToHumanDate } from 'utils/formatToHumanDate';
import { groupMessages } from 'utils/groupMessages';
import Message from '../Message';
import './MessagesList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import debounce from 'lodash.debounce';
import { messagesActions } from 'store/slices';
import Button from 'components/ui/Button';

interface IMessageListProps {
  activeChatId: string;
}

export function compact<T>(array: T[]) {
  return array.filter(Boolean);
}

const MessagesList: FC<IMessageListProps> = ({ activeChatId }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const endOfUnreadedMessages = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { scrollOffset, selectedMessages, messagesById, messagesIds, myId, activeChat } =
    useAppSelector((state) => {
      return {
        messagesById: state.entities.messages.byChatId[activeChatId]?.byId || {},
        messagesIds: state.entities.messages.byChatId[activeChatId]?.messagesIds || [],
        scrollOffset: state.entities.messages.byChatId[activeChatId]?.scrollOffset || 0,
        selectedMessages: state.entities.messages.byChatId[activeChatId]?.selectedMessages || {},
        myId: state.user.user._id || {},
        activeChat: state.ui.activeChat
      };
    });

  const selectedMessageCount = Object.keys(selectedMessages).length;

  useEffect(() => {
    //Initially set scroll, if it exists
    if (listRef.current) {
      const point =
        listRef.current.scrollHeight - (scrollOffset || 0) - listRef.current.offsetHeight;
      listRef.current.scrollTo(0, point);
    }

    const handleScroll = debounce((e: Event) => {
      const scrollHeight = (e.target as HTMLDivElement).scrollHeight;
      const offsetBottom =
        scrollHeight -
        (e.target as HTMLDivElement).scrollTop -
        (e.target as HTMLDivElement).offsetHeight;
      dispatch(messagesActions.setScrollOffset({ chatId: activeChatId, offset: offsetBottom }));

      if (endOfUnreadedMessages.current && listRef.current) {
        const scrollHeight = listRef?.current?.scrollHeight;
        const scrolled = listRef?.current?.scrollTop + listRef?.current?.clientHeight;
        console.log(scrollHeight);
        console.log(scrolled);

        if (scrollHeight - scrolled <= 10) {
          dispatch(messagesActions.readMessages({ chatId: activeChatId }));
        }
      }
    }, 100);

    listRef?.current?.addEventListener('scroll', handleScroll);
    // dispatch(messagesActions.clearAllSelectedMessages(activeChatId));
    return () => {
      listRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [activeChatId]);

  useEffect(() => {
    //Scroll to bottom when new message, if user in the bottom of chat
    if (Number(scrollOffset) <= 1) {
      if (listRef?.current) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messagesIds, messagesById]);

  useLayoutEffect(() => {
    if (endOfUnreadedMessages.current && listRef.current) {
      const scrollHeight = listRef?.current?.scrollHeight;
      const scrolled = listRef?.current?.scrollTop + listRef?.current?.clientHeight;
      console.log(scrollHeight);
      console.log(scrolled);

      if (scrollHeight - scrolled <= 10) {
        dispatch(messagesActions.readMessages({ chatId: activeChatId }));
      }
    }
  }, [messagesIds, messagesById]);

  const renderedMessages = useMemo(() => {
    if (!messagesIds?.length) return;
    const { groupedByDateAndSender: messagesGroups } = groupMessages(messagesById, messagesIds);
    return Object.keys(messagesGroups).map((date, msgGroupsIdx, msgGroupsArr) => {
      return (
        <div className="date-group" key={date + msgGroupsIdx}>
          <div className="date-label-container" key={date}>
            <div className="date-label">{formatToHumanDate(date)}</div>
          </div>
          <TransitionGroup key={msgGroupsIdx} component={null}>
            {messagesGroups[date]
              .map((senderGroup, senderIdx, senderArr) => {
                return senderGroup
                  .map((message, msgIdx, msgArr) => {
                    const firstInGroup = msgIdx === 0;
                    const lastInGroup = msgIdx === msgArr.length - 1;
                    // @ts-ignore
                    const ref = createRef<null | HTMLElement>(null);

                    return (
                      <CSSTransition
                        key={message.id}
                        timeout={300}
                        classNames="item"
                        // @ts-ignore
                        nodeRef={ref}>
                        <Message
                          ref={ref}
                          key={message.id}
                          message={message}
                          isOwn={message.from.id === myId}
                          isFirstInGroup={firstInGroup}
                          isLastInGroup={lastInGroup}
                          chatType={activeChat.type}
                          isSelectionModeOn={!!selectedMessageCount}
                          isSelected={!!selectedMessages[message.id]}
                          selectMessage={() =>
                            dispatch(
                              messagesActions.toggleSelectMessage({
                                chatId: activeChatId,
                                msgId: message.id
                              })
                            )
                          }
                          onDelete={() => {
                            dispatch(
                              messagesActions.deleteMessages({
                                chatId: activeChatId,
                                messagesIds: [message.id]
                              })
                            );
                          }}
                        />
                      </CSSTransition>
                    );
                  })
                  .flat();
              })
              .flat()}
          </TransitionGroup>
        </div>
      );
    });
  }, [messagesById, messagesIds, selectedMessages]);

  return (
    <>
      <div className={`selected-menu ${selectedMessageCount ? 'show' : ''}`}>
        <Button
          color="error"
          onClick={() => {
            dispatch(
              messagesActions.deleteMessages({
                chatId: activeChatId,
                messagesIds: Object.keys(selectedMessages)
              })
            );
            dispatch(messagesActions.clearAllSelectedMessages(activeChatId));
          }}>
          Delete {selectedMessageCount}
        </Button>
        <Button color="secondary">
          <span className="material-symbols-outlined">arrow_top_right</span>
          Forward
        </Button>
        <Button
          color="primary"
          style={{ marginLeft: 'auto' }}
          onClick={() => dispatch(messagesActions.clearAllSelectedMessages(activeChatId))}>
          Cancel
        </Button>
      </div>
      <div className="msg-list" ref={listRef}>
        {renderedMessages}
      </div>
    </>
  );
};

export default memo(MessagesList);
