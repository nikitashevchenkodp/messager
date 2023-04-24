import { IReaction } from 'blocks/message/Reactions/Reactions';

export interface ILoginResponse {
  accessToken: string;
  user: {
    _id: string;
    avatar: string;
    fullName: string;
    email: string;
    chats: Array<string>;
  };
}

export type Attachment = 'img' | 'video';
export interface IMediaItem {
  type: Attachment;
  src: string;
}
export interface IMessage {
  text: string;
  createdAt: string;
  from: string;
  _id: string;
  chatId: string;
  updatedAt: string;
  // delivered: boolean;
  unreaded?: boolean;
  edited: boolean;
  reactions: IReaction[];
  attachment?: {
    media: IMediaItem[];
  };
}

export type MessageShort = Pick<IMessage, 'text' | 'createdAt' | 'from' | '_id'>;

export interface IChat {
  id: string;
  avatar: string;
  title: string;
}

export type TypingStatusObject = { userId: string; typing: boolean };
