export interface IChat {
  id: string;
  title: string;
  avatar: string;
  isPinned?: boolean;
  isMuted?: boolean;
  membersCount?: number;
  type?: 'privat' | 'group' | 'channel';
  unreadCount?: number;
}

export interface IMessage {
  id: string;
  from: {
    id: string;
    fullName: string;
    avatar: string;
  };
  chatId: string;
  content: {
    text: string;
  };
  edited: boolean;
  createdAt: string;
  reactions?: [];
  readed?: boolean;
}

export interface IUser {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  chatId: string;
  lastTimeOnline?: number;
}

export enum LeftContent {
  ChatList = 'chat-list',
  UsersList = 'users-list',
  Search = 'search'
}
