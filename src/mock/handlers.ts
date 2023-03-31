import { rest } from 'msw';
import { mockChatMessages83d, mockMessaged066f, mockMessages2ae7f } from './mockMessages';

export const handlers = [
  // rest.get(`http://localhost:5002/socket.io/`, (req, res, ctx) => {
  //   const handshakeResponse = '0';
  //   return res(ctx.status(200), ctx.text('0'));
  // }),
  rest.get('http://localhost:5002/api/chats', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          chatId: '641acc88a2086055b961383d',
          user: {
            fullName: 'Daria Shevchenko',
            id: '63e7b7bfd2c2586ba49c4ba5',
            avatar: 'https://picsum.photos/id/18/200/300'
          }
        },
        {
          chatId: '641c76ee2d63029c0e92ae7f',
          user: {
            fullName: 'Dmitro Huk',
            id: '63e7b7c4d2c2586ba49c4ba7',
            avatar: 'https://picsum.photos/id/21/200/300'
          }
        },
        {
          chatId: '64214f93a6ad862f069d066f',
          user: {
            fullName: 'Irina Shevchenko',
            id: '63e7b7c8d2c2586ba49c4ba9',
            avatar: 'https://picsum.photos/id/23/200/300'
          }
        }
      ])
    );
  }),
  rest.get('http://localhost:5002/api/messages/:chatId', (req, res, ctx) => {
    const { chatId } = req.params;
    if (chatId === '641acc88a2086055b961383d') {
      return res(ctx.json(mockChatMessages83d));
    } else if (chatId === '641c76ee2d63029c0e92ae7f') {
      return res(ctx.json(mockMessages2ae7f));
    } else if (chatId === '64214f93a6ad862f069d066f') {
      return res(ctx.json(mockMessaged066f));
    }
  })

  //   rest.post('http://localhost:3030/order', (req, res, ctx) => {
  //     return res(ctx.json({ orderNumber: 1234567890 }));
  //   })
];
