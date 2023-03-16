export interface ILoginResponse {
  _id: string;
  avatar: string;
  fullName: string;
  email: string;
  chats: Array<string>;
}

type Attachment = 'img' | 'video';

export interface IMessage {
  text: string;
  createdAt: string;
  from: string;
  _id: string;
  chatId: string;
  to: string;
  updatedAt: string;
  delivered?: boolean;
  unreaded?: boolean;
  edited?: boolean;
  attachment?: {
    media: [{ type: Attachment; src: string }];
  };
}

export type MessageShort = Pick<IMessage, 'text' | 'createdAt' | 'from' | '_id'>;

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
