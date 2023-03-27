export type Attachment = 'img' | 'video';
export interface IMediaItem {
  type: Attachment;
  src: string;
}

export interface IReaction {
  reaction: string;
  by: {
    userId: string;
    fullName: string;
    avatar: string;
  };
}

interface IMessage {
  id: string;
  text: string;
  from: string;
  to: string;
  createdAt: string;
  edited: boolean;
  reactions?: IReaction[];
  attachment?: {
    media: IMediaItem[];
  };
}

interface IChat {
  id: string;
  title: string;
  avatar: string;
  lasMessage: IMessage;
  isMuted: boolean;
}

interface Chats {
  byIds: {
    [id: string]: IChat;
  };
  orderPinnedIds: string[];
}

interface Messages {
  byChatId: {
    [id: string]: {
      byId: {
        [id: string]: IMessage;
      };
      pinnedMessagesIds: string[];
    };
  };
}

interface IUser {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  avatar: string;
}

interface UserStatus {
  onlineStatus: 'online' | 'offline';
  lastSeen: number;
  typing: boolean;
}

interface Users {
  byIds: {
    [id: string]: IUser;
  };
  statusesById: {
    [id: string]: UserStatus;
  };
}

interface Auth {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
  };
  isAuth: boolean;
}

interface GlobalState {
  auth: Auth;
  chats: Chats;
  messages: Messages;
  users: Users;
}
