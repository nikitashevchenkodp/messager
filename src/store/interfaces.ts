export interface IChat {
  id: string;
  title: string;
  avatar: string;
  isPinned?: boolean;
  isMuted?: boolean;
  membersCount?: number;
  type: 'privat' | 'group' | 'channel';
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
}
