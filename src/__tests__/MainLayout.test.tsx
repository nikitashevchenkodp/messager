import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { mockUser } from 'mock/user';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'store';
import React from 'react';
import { MainLayout } from 'layouts';
import { io } from 'socket.io-client';

interface MockSocket {
  on: jest.Mock;
  emit: jest.Mock;
  connect: jest.Mock;
}

const mockSocket: MockSocket = {
  on: jest.fn(),
  emit: jest.fn(),
  connect: jest.fn()
};

describe('Main Layout', () => {
  it('Renders all 3 parts of main layout', async () => {
    // const store = createStore({ authentication: { user: mockUser } });
    // const persistor = persistStore(store);
    // const container = render(
    //   <Provider store={store}>
    //     <PersistGate persistor={persistor}>
    //       <MainLayout />
    //     </PersistGate>
    //   </Provider>
    // );
    // // jest.mock('socket.io-client', () => ({
    // //   __esModule: true,
    // //   default: () => mockSocket
    // // }));
    // const chatList = await container.findByTestId('chat-list');
    // expect(chatList).toBeInTheDocument();
    // const chat = await container.findByTestId('chat');
    // expect(chat).toBeInTheDocument();
    // const folders = await container.findByTestId('folders');
    // expect(folders).toBeInTheDocument();
  });
});
