/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createRef, useMemo, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { formatToHumanDate } from 'utils/formatToHumanDate';
import { groupMessages } from 'utils/groupMessages';
import Message from '../Message';
import './MessagesList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const myId = '000';
const MessagesList = () => {
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { messagesById, messagesIds } = useAppSelector((state) => {
    const activeChat = state.ui.activeChat;
    return {
      messagesById: state.entities.messages.byChatId[activeChat.id]?.byId,
      messagesIds: state.entities.messages.byChatId[activeChat.id]?.messagesIds
    };
  });

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
                      timeout={200}
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
                        setSelected={() => setSelectionMode(!selectionMode)}
                        isSelectionModeOn={selectionMode}
                        isSelected={isSelected}
                        setIsSelected={() => setIsSelected(!isSelected)}
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
  }, [messagesIds]);

  return <div className="msg-list">{renderedMessages}</div>;
};

export default MessagesList;
