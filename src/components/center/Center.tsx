import classNames from 'classnames';
import useMediaQuery from 'hooks/useMediaQwery';
import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import './Center.scss';
import CenterFooter from './CenterFooter';
import CenterHeader from './CenterHeader';
import MessagesList from './MessagesList';

const Center = () => {
  const { isCenterOpen, isRightOpen } = useAppSelector((state) => state.ui);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);

  const activeChat = useAppSelector((state) => state.ui.activeChat);
  const centerClasses = classNames({
    'section center': true,
    'section-hide-right-md': !isCenterOpen,
    'section-moved-left-10rem-sm': isRightOpen
  });

  const isMd = useMediaQuery('(max-width: 900px)');
  const isNotChannel = activeChat?.type !== 'channel';

  return (
    <div
      onDragEnter={(e) => {
        setIsDropZoneActive(true);
      }}
      className={centerClasses}
      aria-expanded={isMd ? isCenterOpen : undefined}
      data-testid="center">
      {activeChat ? (
        <>
          <CenterHeader activeChat={activeChat} />
          <MessagesList activeChatId={activeChat.id} />
          {isNotChannel && (
            <CenterFooter
              activeChat={activeChat}
              onHide={() => setIsDropZoneActive(false)}
              isDropZoneActive={isDropZoneActive}
            />
          )}
        </>
      ) : (
        <div className="not-selected-chat">
          <div className="content">Select a chat</div>
        </div>
      )}
    </div>
  );
};

export default Center;
