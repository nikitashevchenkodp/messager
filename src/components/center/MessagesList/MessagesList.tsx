/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  createRef,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
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

const myId = '000';

const MessagesList: FC<IMessageListProps> = ({ activeChatId }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const { messagesById, messagesIds, scrollOffset, selectedMessages } = useAppSelector((state) => {
    return {
      messagesById: state.entities.messages.byChatId[activeChatId]?.byId || {},
      messagesIds: state.entities.messages.byChatId[activeChatId]?.messagesIds || [],
      scrollOffset: state.entities.messages.byChatId[activeChatId]?.scrollOffset || 0,
      selectedMessages: state.entities.messages.byChatId[activeChatId]?.selectedMessages || {}
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
  }, [messagesIds]);

  const renderedMessages = useMemo(() => {
    if (!messagesIds?.length) return;
    const messagesGroups = groupMessages(messagesById, messagesIds);

    return Object.keys(messagesGroups).map((date, i) => {
      return (
        <div className="date-group" key={date + i}>
          <div className="date-label-container" key={date}>
            <div className="date-label">{formatToHumanDate(date)}</div>
          </div>
          <TransitionGroup key={i} component={null}>
            {messagesGroups[date]
              .map((senderGroup, i) => {
                return senderGroup.map((message, i, arr) => {
                  const firstInGroup = i === 0;
                  const lastInGroup = i === arr.length - 1;
                  // @ts-ignore
                  const ref = createRef<null | HTMLElement>(null);
                  return (
                    <CSSTransition
                      key={message.id}
                      timeout={500}
                      classNames="item"
                      // @ts-ignore
                      nodeRef={ref}>
                      <Message
                        ref={ref}
                        key={message.id}
                        message={message}
                        isOwn={message.from.id == myId}
                        isFirstInGroup={firstInGroup}
                        isLastInGroup={lastInGroup}
                        chatType={'group'}
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
                      />
                    </CSSTransition>
                  );
                });
              })
              .flat(Infinity)}
          </TransitionGroup>
        </div>
      );
    });
  }, [messagesIds, selectedMessages]);

  return (
    <>
      <div className={`selected-menu ${selectedMessageCount ? 'show' : ''}`}>
        <Button color="error">Delete {selectedMessageCount}</Button>
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
