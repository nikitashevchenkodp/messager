import { useAppSelector } from 'store/hooks';
import ChatItem from '../ChatItem';
import './Chats.scss';

const Chats = () => {
  const chatsIds = useAppSelector((state) => state.entities.chats.chatIds);

  return (
    <>
      <div className="chat-list">
        <div className="list">
          {chatsIds?.map((chatId) => (
            <ChatItem key={chatId} chatId={chatId} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Chats;
