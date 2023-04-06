import { RootState } from 'store';

export const mockStore: Omit<RootState, '_persist'> = {
  ui: {
    snackbar: {
      notifications: []
    },
    uiSettings: {
      windowWidth: 1642,
      isHideChatList: true,
      chatListState: 'expanded',
      chatListWidth: 350
    },
    sidebar: {
      isOpen: false
    }
  },
  authentication: {
    user: {
      _id: '63e7b7b5d2c2586ba49c4ba3',
      fullName: 'Mykyta Shevchenko',
      email: 'm@gmail.com',
      password: '123456',
      avatar: 'https://picsum.photos/id/25/200/300'
    }
  },
  entities: {
    active: {
      activeChat: {
        activeMessage: null,
        chatId: '642683897571e92726bdbcd1',
        user: {
          fullName: 'Daria Shevchenko',
          id: '63e7b7bfd2c2586ba49c4ba5',
          avatar: 'https://picsum.photos/id/18/200/300'
        },
        selectedMessagesIds: {},
        isOpenDeleteModal: false
      },
      activeFolder: 'All chats'
    },
    chats: {
      items: [
        {
          chatId: '642683897571e92726bdbcd1',
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
      ],
      isLoading: false,
      isError: false
    },
    folders: {
      items: [],
      isLoading: false,
      isError: false
    },
    messages: {
      byChatId: {
        '641c76ee2d63029c0e92ae7f': {
          chatId: '641c76ee2d63029c0e92ae7f',
          messages: {
            '641c76ee2d63029c0e92ae81': {
              _id: '641c76ee2d63029c0e92ae81',
              text: 'asdsad',
              createdAt: '2023-03-23T15:11:15.019Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              to: '63e7b7c4d2c2586ba49c4ba7',
              chatId: '641c76ee2d63029c0e92ae7f',
              edited: false,
              reactions: [],
              updatedAt: '2023-03-27T09:09:59.476Z'
            },
            '641c76f02d63029c0e92ae86': {
              _id: '641c76f02d63029c0e92ae86',
              text: 'assad',
              createdAt: '2023-03-23T15:11:15.019Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              to: '63e7b7c4d2c2586ba49c4ba7',
              chatId: '641c76ee2d63029c0e92ae7f',
              edited: false,
              reactions: [],
              updatedAt: '2023-03-23T15:11:15.019Z'
            }
          },
          messagesIds: ['641c76ee2d63029c0e92ae81', '641c76f02d63029c0e92ae86'],
          editableMessage: null
        },
        '642683897571e92726bdbcd1': {
          chatId: '642683897571e92726bdbcd1',
          messages: {
            '642683897571e92726bdbcd3': {
              _id: '642683897571e92726bdbcd3',
              text: 'Hi!',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              to: '63e7b7bfd2c2586ba49c4ba5',
              chatId: '642683897571e92726bdbcd1',
              edited: true,
              reactions: [],
              updatedAt: ''
            },
            '642683fe7571e92726bdbcf1': {
              text: 'Hello',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7bfd2c2586ba49c4ba5',
              to: '63e7b7b5d2c2586ba49c4ba3',
              chatId: '642683897571e92726bdbcd1',
              edited: false,
              _id: '642683fe7571e92726bdbcf1',
              reactions: [],
              updatedAt: ''
            },
            '642684127571e92726bdbcf4': {
              text: 'How are you doing?',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              to: '63e7b7bfd2c2586ba49c4ba5',
              chatId: '642683897571e92726bdbcd1',
              edited: false,
              _id: '642684127571e92726bdbcf4',
              reactions: [],
              updatedAt: ''
            },
            '642684277571e92726bdbcf6': {
              text: 'I am fine, thanks. And you?😀',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7bfd2c2586ba49c4ba5',
              to: '63e7b7b5d2c2586ba49c4ba3',
              chatId: '642683897571e92726bdbcd1',
              edited: false,
              _id: '642684277571e92726bdbcf6',
              reactions: [],
              updatedAt: ''
            }
          },
          messagesIds: [
            '642683897571e92726bdbcd3',
            '642683fe7571e92726bdbcf1',
            '642684127571e92726bdbcf4',
            '642684277571e92726bdbcf6'
          ],
          editableMessage: null
        }
      }
    }
  },
  users: {
    statusesById: {},
    usersById: {}
  }
};
