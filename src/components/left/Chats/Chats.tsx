/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Tab } from 'components/ui/Tab';
import { TabList } from 'components/ui/TabList';
import { createRef, useMemo, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useAppSelector } from 'store/hooks';
import ChatItem from '../ChatItem';
import './Chats.scss';

const Chats = ({ isActive }: { isActive: boolean }) => {
  const chatsIds = useAppSelector((state) => state.entities.chats.chatIds);
  const chatsById = useAppSelector((state) => state.entities.chats.byId);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState(1);
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
          <TabList value={activeTab} onChange={(val: number) => setActiveTab(val)}>
            <Tab value={0} title="All" />
            <Tab value={1} title="News" />
            <Tab value={2} title="Work" />
          </TabList>
          <TransitionGroup component={null}>
            {chatsIds?.map((chatId, i) => {
              // @ts-ignore
              const ref = createRef<null | HTMLElement>(null);
              return (
                <CSSTransition
                  key={chatId}
                  timeout={150}
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
