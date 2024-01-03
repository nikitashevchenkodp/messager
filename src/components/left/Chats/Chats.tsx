/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Tab } from 'components/ui/Tab';
import { TabList } from 'components/ui/TabList';
import { usePrevious } from 'hooks/usePrevious';
import { r } from 'msw/lib/glossary-de6278a9';
import { createRef, useMemo, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ChatList } from '../ChatList';
import './Chats.scss';

const folders = [
  { title: 'All', id: 0 },
  { title: 'Work', id: 1 },
  { title: 'Study', id: 2 }
];

const Chats = ({ isActive }: { isActive: boolean }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState(folders[0].id);
  const prevActiveTab = usePrevious(activeTab);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isActive}
      classNames="section-scaled"
      unmountOnExit
      mountOnEnter
      timeout={300}>
      <div className="chat-list" ref={nodeRef}>
        <TabList value={activeTab} onChange={(val: number) => setActiveTab(val)}>
          {Object.values(folders).map((folder) => (
            <Tab key={folder.id} value={folder.id} title={folder.title} />
          ))}
        </TabList>
        <div className="list">
          <div
            style={{
              transform: `translateX(calc(${-activeTab} * calc(100% + 0.8rem)))`,
              width: '100%',
              display: 'flex',
              gap: '0.8rem'
            }}>
            {Object.values(folders).map((folder, idx) => {
              return <ChatList folderId={folder.id} key={folder.id} ref={nodeRef} />;
            })}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Chats;
