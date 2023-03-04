import { SearchIcon } from 'components/icons';
import ResizableContainer from 'components/ResizableContainer';
import { CHAT_LIST_MIN_WIDTH } from 'consts';
import { chatsActions } from 'features/chat-list/redux/chats';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { uiActions } from 'store/slices/UI';
import ChatListItem from '../ChatListItem/ChatListItem';
import SearchInput from '../SearchInput/SearchInput';
import {
  ChatListContainer,
  ChatListContainerSmallScreen,
  ChatListHeader,
  ChatListStyled,
  List
} from './styled';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const isHideChatList = useAppSelector((state) => state.ui.isHideChatList);
  const chatListState = useAppSelector((state) => state.ui.chatListState);
  const chatList = useAppSelector((state) => state.chats.chats);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const [val, setVal] = useState('');

  const handleClick = () => {
    dispatch(uiActions.setChatListWidth(CHAT_LIST_MIN_WIDTH));
  };

  const setupActiveChat = (id: string) => {
    const activeChat = chatList.filter((chat) => chat.chatId === id)[0];
    console.log(activeChat);

    dispatch(
      chatsActions.setActiveChat({
        chatId: activeChat.chatId,
        partnerFullName: activeChat.partnerFullName,
        partnerId: activeChat.partnerId
      })
    );
  };

  return (
    <>
      <ChatListContainer>
        <ResizableContainer>
          <ChatListStyled>
            <ChatListHeader>
              {chatListState === 'expanded' ? (
                <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
              ) : (
                <SearchIcon onClick={handleClick} cursor="pointer" />
              )}
            </ChatListHeader>
            <List>
              {chatList.length ? (
                chatList?.map((chatItem) => {
                  return (
                    <ChatListItem
                      chatItem={chatItem}
                      key={chatItem.chatId}
                      active={chatItem.chatId === activeChat?.partnerId}
                      onClick={() => setupActiveChat(chatItem.chatId)}
                      type={chatListState}
                    />
                  );
                })
              ) : (
                <>Nothing</>
              )}
            </List>
          </ChatListStyled>
        </ResizableContainer>
      </ChatListContainer>

      <ChatListContainerSmallScreen isHide={isHideChatList}>
        <ChatListStyled>
          <ChatListHeader>
            <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
          </ChatListHeader>
          <List>
            {chatList.length ? (
              chatList?.map((chatItem) => {
                return (
                  <ChatListItem
                    chatItem={chatItem}
                    key={chatItem.chatId}
                    active={chatItem.chatId === activeChat?.partnerId}
                    type="expanded"
                    onClick={() => {
                      setupActiveChat(chatItem.chatId);
                      dispatch(uiActions.hideChatList());
                    }}
                  />
                );
              })
            ) : (
              <>Nothing</>
            )}
          </List>
        </ChatListStyled>
      </ChatListContainerSmallScreen>
    </>
  );
};

export default ChatList;
