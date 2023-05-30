import { renderWithRedux } from 'utils/tests/wrapper';
import ChatItem from 'components/left/ChatItem';
import { chatsActions } from 'store/slices';
import { act } from 'react-dom/test-utils';

describe('Message', () => {
  const chatId = '111';
  const initState = {
    ui: {
      activeChat: null
    },
    entities: {
      chats: {
        byId: {
          '111': {
            id: '111',
            title: 'Dmytro Huk',
            avatar: '',
            type: 'privat',
            lastMessage: {},
            isPinned: false,
            isMute: false
          }
        },
        chatIds: ['111']
      }
    }
  };

  it('renders', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });

    const { container } = renderWithRedux(<ChatItem chatId={chatId} />, initState);
    const chatItem = container.getByTestId(`chat-${chatId}`);
    expect(chatItem).toBeInTheDocument();
  });

  it('Toggle pin chat', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });

    const { container, store } = renderWithRedux(<ChatItem chatId={chatId} />, initState);
    const chatItem = container.getByTestId(`chat-${chatId}`);
    expect(chatItem).toBeInTheDocument();

    const pinIcon = container.queryByTestId('isPinned-icon');
    expect(pinIcon).toBeNull();

    //Pin chat
    act(() => {
      store.dispatch(chatsActions.togglePinChat(chatId));
    });

    const pinIconAfterPin = container.getByTestId('isPinned-icon');
    expect(pinIconAfterPin).toBeInTheDocument();

    //Unpin chat
    act(() => {
      store.dispatch(chatsActions.togglePinChat(chatId));
    });

    const pinIconAfterUnpin = container.queryByTestId('isPinned-icon');
    expect(pinIconAfterUnpin).toBeNull();
  });

  it('Toggle mute chat', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });

    const { container, store } = renderWithRedux(<ChatItem chatId={chatId} />, initState);
    const chatItem = container.getByTestId(`chat-${chatId}`);
    expect(chatItem).toBeInTheDocument();

    const muteIcon = container.queryByTestId('isMuted-icon');
    expect(muteIcon).toBeNull();

    //Mute chat
    act(() => {
      store.dispatch(chatsActions.toggleMuteChat(chatId));
    });

    const muteIconAfterMute = container.getByTestId('isMuted-icon');
    expect(muteIconAfterMute).toBeInTheDocument();

    //Unpin chat
    act(() => {
      store.dispatch(chatsActions.toggleMuteChat(chatId));
    });

    const muteIconAfterUnmute = container.queryByTestId('isMuted-icon');
    expect(muteIconAfterUnmute).toBeNull();
  });
});
