export interface ILoginResponse {
  _id: string;
  avatar: string;
  fullName: string;
  email: string;
  chats: Array<string>;
}

export interface IMessage {
  messageText: string;
  createdAt: string;
  from: string;
  _id: string;
  chatId: string;
  to: string;
  updatedAt: string;
}

export type MessageShort = Pick<IMessage, 'messageText' | 'createdAt' | 'from' | '_id'>;

export interface IChat {
  chatId: string;
  lastMessage: MessageShort;
  user: {
    avatar: string;
    fullName: string;
    id: string;
  };
}

export type TypingStatusObject = { userId: string; typing: boolean };
