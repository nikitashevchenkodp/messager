import { AnimatedList } from 'lib/AnimatedList';
import { createRef, FC, forwardRef } from 'react';
import { useAppSelector } from 'store/hooks';
import ChatItem from '../ChatItem';
import './ChatList.scss';

function getColor(idx: number) {
  switch (idx) {
    case 0:
      return 'green';
    case 1:
      return 'blue';
    case 2:
      return 'red';
  }
}

type Props = {
  folderId: number;
};
const ChatList = forwardRef<HTMLDivElement | null, Props>(({ folderId }, ref) => {
  const chatsIds = useAppSelector((state) => state.entities.chats.chatIds);
  const chatsById = useAppSelector((state) => state.entities.chats.byId);

  return (
    <div className="ChatList" ref={ref}>
      <AnimatedList>
        {chatsIds?.map((chatId, i) => {
          return <ChatItem chat={chatsById[chatId]} key={chatId} ref={createRef()} />;
        })}
      </AnimatedList>
    </div>
  );
});

ChatList.displayName = 'ChatList';

export { ChatList };
