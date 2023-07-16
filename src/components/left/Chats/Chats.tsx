/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRef, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppSelector } from 'store/hooks';
import ChatItem from '../ChatItem';
import './Chats.scss';

const Chats = ({ isActive }: { isActive: boolean }) => {
  const chatsIds = useAppSelector((state) => state.entities.chats.chatIds);
  const chatsById = useAppSelector((state) => state.entities.chats.byId);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  console.log(chatsIds);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isActive}
      classNames="section-scaled"
      unmountOnExit
      mountOnEnter
      timeout={300}>
      <div className="chat-list" ref={nodeRef}>
        <div className="list">
          <h3 className="left-content-title">Chats</h3>
          <TransitionGroup component={null}>
            {chatsIds?.map((chatId, i) => {
              // @ts-ignore
              const ref = createRef<null | HTMLElement>(null);
              return (
                <CSSTransition
                  key={chatId}
                  timeout={150 * (i + 1)}
                  classNames="chatItem"
                  // @ts-ignore
                  nodeRef={ref}>
                  <ChatItem chat={chatsById[chatId]} ref={ref} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Chats;
