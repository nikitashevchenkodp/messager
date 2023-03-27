import { IMessage } from 'types';

import mockmessagePhoto from '../assets/mockmessagePhoto.jpg';

export const mockMessage: IMessage = {
  text: 'Hi it is a test message',
  createdAt: '2023-03-17T08:28:08.472Z',
  from: '63e7b7b5d2c2586ba49c4ba3',
  _id: '641443bcc2b3aef3fb827274',
  chatId: '64131975af9da4d549f3a47f',
  to: '63e7b7c8d2c2586ba49c4ba9',
  updatedAt: '2023-03-17T08:28:08.472Z',
  delivered: false,
  unreaded: true,
  edited: false,
  reactions: [
    {
      _id: 'asdfasdf',
      reaction: '💋',
      by: {
        id: '23451234123412341234',
        fullName: 'Nikita Shevchenko',
        avatar: 'https://picsum.photos/id/25/200/300'
      }
    },
    {
      _id: '234rfds342frewfr',
      reaction: '🇺🇦',
      by: {
        id: '23451234123412341234',
        fullName: 'Nikita Shevchenko',
        avatar: ''
      }
    }
  ],
  attachment: {
    media: [
      { type: 'img', src: mockmessagePhoto },
      { type: 'img', src: mockmessagePhoto },
      { type: 'img', src: mockmessagePhoto },
      { type: 'img', src: mockmessagePhoto },
      { type: 'img', src: mockmessagePhoto },
      { type: 'img', src: mockmessagePhoto }
    ]
  }
};
