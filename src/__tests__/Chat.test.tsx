import { render, screen } from '@testing-library/react';
import { Chat } from 'features/chat';
import { mockUser } from 'mock/user';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'store';
import React from 'react';

describe('Chat', () => {
  it('Renders without any info if not active chat', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);
    store.dispatch({ type: 'init' });

    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Chat />
        </PersistGate>
      </Provider>
    );

    const chatNotSelected = await container.findByText(/select/i);
    expect(chatNotSelected).toBeInTheDocument();
  });

  it('Renders all chat components if is active chat', async () => {
    const store = createStore({
      authentication: { user: mockUser },
      entities: {
        active: {
          activeChat: {
            activeMessage: null,
            chatId: '641acc88a2086055b961383d',
            user: {
              fullName: 'Daria Shevchenko',
              id: '63e7b7bfd2c2586ba49c4ba5',
              avatar: 'https://picsum.photos/id/18/200/300'
            },
            selectedMessagesIds: {},
            isOpenDeleteModal: false
          }
        }
      }
    });
    const persistor = persistStore(store);
    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Chat />
        </PersistGate>
      </Provider>
    );

    const header = await container.findByTestId('chat-header');
    screen.debug();
    expect(header).toBeInTheDocument();
  });
});
