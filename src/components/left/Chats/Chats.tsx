import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector } from 'store/hooks';
import ChatItem from '../ChatItem';
import './Chats.scss';

const Chats = ({ isActive }: { isActive: boolean }) => {
  const chatsIds = useAppSelector((state) => state.entities.chats.chatIds);
  const nodeRef = useRef<HTMLDivElement | null>(null);

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
          {chatsIds?.map((chatId) => (
            <ChatItem key={chatId} chatId={chatId} />
          ))}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Chats;
