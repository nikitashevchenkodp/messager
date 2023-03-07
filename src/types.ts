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
  partnerAvatar: string;
  partnerFullName: string;
  partnerId: string;
}

export type OnlineUsers = string[];

export type TypingStatusObject = { userId: string; status: 'typing' | '' };
