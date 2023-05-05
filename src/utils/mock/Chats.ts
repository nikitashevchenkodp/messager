export const chats = [
  {
    id: '111',
    title: 'Dmytro Huk',
    avatar: '',
    type: 'privat',
    lastMessage: {}
  },
  {
    id: '222',
    title: 'Daria Shevchenko',
    avatar: '',
    type: 'privat',
    lastMessage: {},
    isPinned: true
  },
  { id: '333', title: 'Irina Shevchenko', avatar: '', type: 'privat', lastMessage: {} },
  { id: '444', title: 'Pavlo Yefimov', avatar: '', type: 'privat', lastMessage: {} },
  { id: '555', title: 'Petrov pavlo', avatar: '', type: 'privat', lastMessage: {} },
  {
    id: '-666',
    title: 'Family chat',
    avatar: '',
    type: 'group',
    membersCount: 5,
    lastMessage: {
      id: '1',
      from: { id: '222', fullName: 'Daria Shevchenko' },
      text: 'Hello, how are you doing?',
      cretedAt: '15:08',
      chatId: '-6'
    }
  },
  {
    id: '-777',
    title: 'News Channel',
    avatar: '',
    type: 'channel',
    membersCount: 123000,
    lastMessage: {
      id: '1',
      from: { id: '222', fullName: 'Daria Shevchenko' },
      text: 'Last message in this channel',
      cretedAt: '15:08',
      chatId: '-6'
    }
  }
];
