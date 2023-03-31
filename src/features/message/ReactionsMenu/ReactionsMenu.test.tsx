import { render, screen } from '@testing-library/react';
import ReactionsMenu from './ReactionsMenu';
import React from 'react';
import { differentReactions, crazyReaction } from 'mock/reactions';
import { mockUser } from 'mock/user';
import { createStore } from 'store';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

describe('ReactionsMenu', () => {
  // Unit tests
  it('Renders', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);
    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ReactionsMenu
            addReaction={() => console.log('add')}
            alreadeMadeReactions={differentReactions}
          />
        </PersistGate>
      </Provider>
    );
    const reactMenu = await container.findByTestId('reactions-menu');
    expect(reactMenu).toBeInTheDocument();
  });

  it('If you used reaction "💋" it will not be in the document', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);
    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ReactionsMenu
            addReaction={() => console.log('add')}
            alreadeMadeReactions={differentReactions}
          />
        </PersistGate>
      </Provider>
    );
    const reactions = await container.findByTestId('reactions-menu');
    expect(reactions).not.toHaveTextContent(/💋/);
  });
  it('If you used reaction "🤪" it will not be in the document', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);
    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ReactionsMenu
            addReaction={() => console.log('add')}
            alreadeMadeReactions={crazyReaction}
          />
        </PersistGate>
      </Provider>
    );
    const reactions = await container.findByTestId('reactions-menu');
    expect(reactions).not.toHaveTextContent(/🤪/);
  });
});
