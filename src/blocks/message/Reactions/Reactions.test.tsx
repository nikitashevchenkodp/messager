import { render, screen } from '@testing-library/react';
import { mockMessage } from 'mock/message';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'store';
import { mockUser } from 'mock/user';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import Reactions from './Reactions';
import { differentReactions, sameReactions } from 'mock/reactions';
import userEvent from '@testing-library/user-event';

describe('Reactions', () => {
  // Unit tests

  it('Renders', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);

    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Reactions
            reactions={differentReactions}
            type="sent"
            chatId={mockMessage.chatId}
            messageId={mockMessage._id}
          />
        </PersistGate>
      </Provider>
    );
    const reactions = await container.findByTestId('message-reactions');
    expect(reactions).toBeInTheDocument();
  });
  it('if 2 different reactions from different users, there will be 2 reaction button', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);

    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Reactions
            reactions={differentReactions}
            type="sent"
            chatId={mockMessage.chatId}
            messageId={mockMessage._id}
          />
        </PersistGate>
      </Provider>
    );
    const reactions = await container.findAllByTestId(/reaction-btn/);
    expect(reactions.length).toBe(2);
  });
  it('if 2 same reactions from different users, there will be 1 reaction button with 2 avatars', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);

    const container = render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Reactions
            reactions={sameReactions}
            type="sent"
            chatId={mockMessage.chatId}
            messageId={mockMessage._id}
          />
        </PersistGate>
      </Provider>
    );
    const reactions = await container.findAllByTestId(/reaction-btn/);
    expect(reactions.length).toBe(1);
    const reactionsAvatar = await container.findAllByTestId(/reaction-avatar/);
    expect(reactionsAvatar.length).toBe(2);
  });

  //   it('Delete reactions if it is yours', async () => {
  //     const store = createStore({ authentication: { user: mockUser } });
  //     const persistor = persistStore(store);
  //     const container = render(
  //       <Provider store={store}>
  //         <PersistGate persistor={persistor}>
  //           <Reactions
  //             reactions={differentReactions}
  //             type="sent"
  //             chatId={mockMessage.chatId}
  //             messageId={mockMessage._id}
  //           />
  //         </PersistGate>
  //       </Provider>
  //     );
  //     const reactionButtons = await container.findAllByTestId(/reaction-btn/);
  //     expect(reactionButtons.length).toBe(2);
  //     const reactionByUser = await container.findByTestId('reaction-btnasdfasdf');
  //     console.log(reactionByUser);
  //     userEvent.click(reactionByUser);
  //     const reactionButtonsAgain = await container.findAllByTestId(/reaction-btn/);
  //     expect(reactionButtonsAgain.length).toBe(1);
  //   });
});
