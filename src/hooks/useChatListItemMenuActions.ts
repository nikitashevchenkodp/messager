import { useMemo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { IChat } from 'store/interfaces';
import { chatsActions } from 'store/slices';

type Args = {
  //   isPinned: boolean;
  //   isMuted: boolean;
  chat: IChat;
  handleFolderAction: () => void;
  //   handlePinAction: () => void;
  //   handleMuteAction: () => void;
  //   handleDeleteAction: () => void;
};

export const useChatListItemMenuActions = (args: Args) => {
  const dispatch = useAppDispatch();

  const { chat, handleFolderAction } = args;

  return useMemo(() => {
    const addToFolderAction = {
      title: 'Add to folder',
      icon: 'add',
      handler: handleFolderAction
    };

    const pinAction = {
      title: chat.isPinned ? 'Unpin' : 'Pin',
      icon: chat.isPinned ? 'redo' : 'push_pin',
      handler: () => {
        dispatch(chatsActions.togglePinChat(chat.id));
      }
    };

    const muteAction = {
      title: chat.isMuted ? 'Unmute' : 'Mute',
      icon: chat.isMuted ? 'volume_up' : 'volume_off',
      handler: () => {
        dispatch(chatsActions.toggleMuteChat(chat.id));
      }
    };

    const deleteAction = {
      title: 'Delete',
      icon: 'delete',
      handler: () => {
        dispatch(chatsActions.deleteChat(chat.id));
      }
    };

    return { addToFolderAction, pinAction, muteAction, deleteAction };
  }, [chat, handleFolderAction]);
};
