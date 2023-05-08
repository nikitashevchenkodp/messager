import React, { useState } from 'react';
import Message from '../Message';
import './MessagesList.scss';

const MessagesList = () => {
  const [selectionMode, setSelectionMode] = useState<any>(true);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="msg-list">
      <Message
        isOwn={false}
        isFirstInGroup={true}
        isLastInGroup={false}
        chatType={'group'}
        setSelected={() => setSelectionMode(!selectionMode)}
        isSelectionModeOn={selectionMode}
        isSelected={isSelected}
        setIsSelected={() => setIsSelected(!isSelected)}
      />
      <Message
        isOwn={false}
        isSelected={isSelected}
        isFirstInGroup={false}
        isLastInGroup={true}
        chatType={'group'}
        setSelected={() => setSelectionMode(!selectionMode)}
        isSelectionModeOn={selectionMode}
        setIsSelected={() => setIsSelected(!isSelected)}
      />

      <Message
        isOwn={true}
        isSelected={isSelected}
        isFirstInGroup={true}
        isLastInGroup={true}
        chatType={'group'}
        setSelected={() => setSelectionMode(!selectionMode)}
        isSelectionModeOn={selectionMode}
        setIsSelected={() => setIsSelected(!isSelected)}
      />
    </div>
  );
};

export default MessagesList;
