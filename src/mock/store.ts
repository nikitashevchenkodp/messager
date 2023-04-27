import { RootState } from 'store';

export const mockStore: Omit<RootState, '_persist'> = {
  ui: {
    snackbar: {
      notifications: []
    },
    uiSettings: {
      windowWidth: 1642,
      chatListState: 'expanded',
      chatListWidth: 350,
      isChatOpen: true
    },
    sidebar: {
      isOpen: false
    }
  },
  authentication: {
    isAuth: true,
    accessToken: '1324asgdfqr45trfd2regtrf',
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
        id: '642683897571e92726bdbcd1',
        title: 'Daria Shevchenko',
        avatar: 'https://picsum.photos/id/18/200/300',
        selectedMessagesIds: {},
        isOpenDeleteModal: false
      },
      activeFolder: 'All chats'
    },
    chats: {
      items: [
        {
          id: '642683897571e92726bdbcd1',
          title: 'Daria Shevchenko',
          avatar: 'https://picsum.photos/id/18/200/300'
        },
        {
          id: '641c76ee2d63029c0e92ae7f',
          title: 'Dmitro Huk',
          avatar: 'https://picsum.photos/id/21/200/300'
        },
        {
          id: '64214f93a6ad862f069d066f',
          title: 'Irina Shevchenko',
          avatar: 'https://picsum.photos/id/23/200/300'
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
              chatId: '63e7b7c4d2c2586ba49c4ba7',
              edited: false,
              reactions: [],
              updatedAt: '2023-03-27T09:09:59.476Z'
            },
            '641c76f02d63029c0e92ae86': {
              _id: '641c76f02d63029c0e92ae86',
              text: 'assad',
              createdAt: '2023-03-23T15:11:15.019Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              chatId: '63e7b7c4d2c2586ba49c4ba7',
              edited: false,
              reactions: [],
              updatedAt: '2023-03-23T15:11:15.019Z'
            }
          },
          messagesIds: ['641c76ee2d63029c0e92ae81', '641c76f02d63029c0e92ae86'],
          editableMessage: null,
          inputValue: ''
        },
        '642683897571e92726bdbcd1': {
          chatId: '642683897571e92726bdbcd1',
          messages: {
            '642683897571e92726bdbcd3': {
              _id: '642683897571e92726bdbcd3',
              text: 'Hi!',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              chatId: '63e7b7bfd2c2586ba49c4ba5',
              edited: true,
              reactions: [],
              updatedAt: ''
            },
            '642683fe7571e92726bdbcf1': {
              text: 'Hello',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7bfd2c2586ba49c4ba5',
              chatId: '63e7b7b5d2c2586ba49c4ba3',
              edited: false,
              _id: '642683fe7571e92726bdbcf1',
              reactions: [],
              updatedAt: ''
            },
            '642684127571e92726bdbcf4': {
              text: 'How are you doing?',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7b5d2c2586ba49c4ba3',
              chatId: '63e7b7bfd2c2586ba49c4ba5',
              edited: false,
              _id: '642684127571e92726bdbcf4',
              reactions: [],
              updatedAt: ''
            },
            '642684277571e92726bdbcf6': {
              text: 'I am fine, thanks. And you?😀',
              createdAt: '2023-03-31T06:26:02.851Z',
              from: '63e7b7bfd2c2586ba49c4ba5',
              chatId: '63e7b7b5d2c2586ba49c4ba3',
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
          editableMessage: null,
          inputValue: ''
        }
      }
    }
  },
  users: {
    statusesById: {},
    usersById: {},
    userIds: []
  }
};
