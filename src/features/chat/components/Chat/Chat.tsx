import React, { Suspense, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import ChatArea from '../ChatArea/ChatArea';
import ChatControls from '../ChatControls/ChatControls';
import ChatHeader from '../ChatHeader/ChatHeader';
import SelectedMessagesMenu from '../SelectedMessagesMenu';

import { ChatStyled, NoActveChats, SelectChat } from './styled';

const Chat = () => {
  const activeChat = useAppSelector((state) => state.entities.active.activeChat);
  const [selectedMessagesIds, setSelectedMessagesIds] = useState({} as Record<PropertyKey, string>);
  const addToSelected = (id: string) => {
    setSelectedMessagesIds(() => {
      return { ...selectedMessagesIds, [id]: id };
    });
  };

  const deleteAllSelectedMessages = () => setSelectedMessagesIds({});

  const toggleFromSelected = (id: string) => {
    if (selectedMessagesIds[id]) {
      setSelectedMessagesIds((prevSelected) => {
        delete prevSelected[id];
        return { ...prevSelected };
      });
    } else {
      setSelectedMessagesIds((prevSelected) => {
        prevSelected[id] = id;
        return { ...prevSelected };
      });
    }
  };

  console.log(selectedMessagesIds);

  return (
    <ChatStyled>
      {activeChat ? (
        <>
          {' '}
          <SelectedMessagesMenu
            selectedMessagesIds={selectedMessagesIds}
            deleteAllSelectedMessages={deleteAllSelectedMessages}
          />
          <ChatHeader />
          <ChatArea
            addToSelected={addToSelected}
            toggleFromSelected={toggleFromSelected}
            selectedMessagesIds={selectedMessagesIds}
          />
          <ChatControls />
        </>
      ) : (
        <NoActveChats>
          <SelectChat>Please select a chat</SelectChat>
        </NoActveChats>
      )}
    </ChatStyled>
  );
};

export default Chat;
