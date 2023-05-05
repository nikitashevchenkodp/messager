export interface IChat {
  id: string;
  title: string;
  avatar: string;
  isPinned?: boolean;
  isMuted?: boolean;
  membersCount?: number;
  type: 'privat' | 'group' | 'channel';
}
