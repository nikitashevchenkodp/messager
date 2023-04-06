import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Chat, messagesActions } from 'blocks/chat';
import { mockUser } from 'mock/user';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'store';
import React from 'react';
import { mockStore } from 'mock/store';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRedux } from 'wrapper';

describe('Chat', () => {
  it('Renders without any info if not active chat', async () => {
    const store = createStore({ authentication: { user: mockUser } });
    const persistor = persistStore(store);

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
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const { container } = renderWithRedux(<Chat />, mockStore);

    const header = await container.findByTestId('chat-header');
    expect(header).toBeInTheDocument();
    const chatMessages = await container.findByTestId('chat-messages');
    expect(chatMessages).toBeInTheDocument();
    const chatControls = await container.findByTestId('chat-controls');
    expect(chatControls).toBeInTheDocument();
  });

  it('Renders messages from active chat in chat area', async () => {
    const { container } = renderWithRedux(<Chat />, mockStore);

    const messages = await container.findAllByTestId(/message-container/);
    expect(messages.length).toEqual(4);
  });

  it('Opens message menu when click right button on message', async () => {
    const { container } = renderWithRedux(<Chat />, mockStore);

    const message = await container.findByTestId(/642683fe7571e92726bdbcf1/);
    expect(message).toBeInTheDocument();
    fireEvent.contextMenu(message);
    const messageMenu = await container.findByTestId('message-menu');
    expect(messageMenu).toBeInTheDocument();
  });

  it('Selected messages menu when not selected messages', async () => {
    const { container } = renderWithRedux(<Chat />, mockStore);

    const selectedMessagesMenu = await container.findByTestId('selected-messages-menu');
    const forwardMessageButton = await container.findByRole('button', { name: /Forward/ });
    const deleteMessageButton = await container.findByRole('button', { name: /Delete/ });
    expect(selectedMessagesMenu).toHaveStyle({ transform: 'translateY(-100%)', opacity: '0' });
    expect(forwardMessageButton).toHaveTextContent('0');
    expect(deleteMessageButton).toHaveTextContent('0');
  });

  it('Selected messages menu when selected messages', async () => {
    const { container } = renderWithRedux(<Chat />, mockStore);

    const message = await container.findByTestId(/642683fe7571e92726bdbcf1/);
    expect(message).toBeInTheDocument();
    fireEvent.contextMenu(message);

    const selectMessageOption = await container.findByText(/Select/);
    userEvent.click(selectMessageOption);

    const selectedMessagesMenu = await container.findByTestId('selected-messages-menu');
    const forwardMessageButton = await container.findByRole('button', { name: /Forward/ });
    const deleteMessageButton = await container.findByRole('button', { name: /Delete/ });
    expect(selectedMessagesMenu).toHaveStyle({ transform: 'none', opacity: '1' });
    expect(forwardMessageButton).toHaveTextContent('1');
    expect(deleteMessageButton).toHaveTextContent('1');
  });

  it('Toggle select message by click if selected at least 1 message', async () => {
    const { container } = renderWithRedux(<Chat />, mockStore);

    const message = await container.findByTestId(/642683fe7571e92726bdbcf1/);
    const selectedMessagesMenu = await container.findByTestId('selected-messages-menu');
    const forwardMessageButton = await container.findByRole('button', { name: /Forward/ });
    const deleteMessageButton = await container.findByRole('button', { name: /Delete/ });

    //when not selected messages, you cannot select mesage by click on it.
    userEvent.click(message);
    expect(selectedMessagesMenu).toHaveStyle({ transform: 'translateY(-100%)', opacity: '0' });
    expect(forwardMessageButton).toHaveTextContent('0');
    expect(deleteMessageButton).toHaveTextContent('0');

    // Select 1 message, after that appers menu with delete and forward messages.
    fireEvent.contextMenu(message);
    const selectMessageOption = await container.findByText(/Select/);
    userEvent.click(selectMessageOption);
    expect(selectedMessagesMenu).toHaveStyle({ transform: 'none', opacity: '1' });
    expect(forwardMessageButton).toHaveTextContent('1');
    expect(deleteMessageButton).toHaveTextContent('1');

    // Add to select messegase one message by click on it
    const anotherMessage = await container.findByTestId(/642684127571e92726bdbcf4/);
    userEvent.click(anotherMessage);
    expect(forwardMessageButton).toHaveTextContent('2');
    expect(deleteMessageButton).toHaveTextContent('2');

    //We are able to unselect message by click on it
    userEvent.click(anotherMessage);
    expect(forwardMessageButton).toHaveTextContent('1');
    expect(deleteMessageButton).toHaveTextContent('1');

    userEvent.click(message);
    expect(selectedMessagesMenu).toHaveStyle({
      transform: 'translateY(-100%)',
      opacity: '0'
    });
    expect(forwardMessageButton).toHaveTextContent('0');
    expect(deleteMessageButton).toHaveTextContent('0');
  });

  it('Delete message', async () => {
    const { container, store } = renderWithRedux(<Chat />, mockStore);

    const message = await container.findByTestId(/642683fe7571e92726bdbcf1/);
    fireEvent.contextMenu(message);
    const deleteMessageOption = await container.findByTestId('delete-option');
    userEvent.click(deleteMessageOption);
    const deleteMessageConfirmation = await container.findByTestId('delete-message-confirmation');
    expect(deleteMessageConfirmation).toBeInTheDocument();
    const delButton = await container.findByRole('button', { name: 'Confirm' });
    userEvent.click(delButton);
    const chatId = store.getState().entities.active.activeChat.chatId;

    act(() =>
      store.dispatch(
        messagesActions.deleteMessages({ chatId, messagesIds: ['642683fe7571e92726bdbcf1'] })
      )
    );

    waitFor(async () => {
      expect(message).not.toBeInTheDocument();
      const chatMessages = await container.findAllByTestId(/message-container/);
      expect(chatMessages.length).toBe(3);
    });
  });

  it('Delete more than 1 message', async () => {
    const { container, store } = renderWithRedux(<Chat />, mockStore);
    const message = await container.findByTestId(/642683fe7571e92726bdbcf1/);
    fireEvent.contextMenu(message);
    // Select message for opening selected messages menu
    const selectMessageOption = await container.findByTestId('select-option');
    userEvent.click(selectMessageOption);
    // Select second message
    const anotherMessage = await container.findByTestId(/642684127571e92726bdbcf4/);
    userEvent.click(anotherMessage);
    // Expect 2 selecte messages
    const forwardMessageButton = await container.findByRole('button', { name: /Forward/ });
    const deleteMessageButton = await container.findByRole('button', { name: /Delete/ });
    expect(forwardMessageButton).toHaveTextContent('2');
    expect(deleteMessageButton).toHaveTextContent('2');
    // Click delete button on selected messages menu
    userEvent.click(deleteMessageButton);
    const chatId = store.getState().entities.active.activeChat.chatId;

    act(() =>
      store.dispatch(
        messagesActions.deleteMessages({
          chatId,
          messagesIds: ['642683fe7571e92726bdbcf1', '642684127571e92726bdbcf4']
        })
      )
    );

    waitFor(async () => {
      const chatMessages = await container.findAllByTestId(/message-container/);
      expect(chatMessages.length).toBe(2);
    });
  });

  it('edit message', async () => {
    const { container, store } = renderWithRedux(<Chat />, mockStore);
    const message = await container.findByTestId(/642683fe7571e92726bdbcf1/);
    let editableMessage = container.queryByTestId('editable-message');
    expect(editableMessage).toBeNull();
    fireEvent.contextMenu(message);
    // Select message for opening selected messages menu
    const edittMessageOption = await container.findByTestId('edit-option');
    userEvent.click(edittMessageOption);
    editableMessage = await container.findByTestId('editable-message');
    expect(editableMessage).toBeInTheDocument();

    // Check input
    const input = container.getByTestId('chat-controls-input') as HTMLInputElement;
    expect(input.value).toEqual('Hello');

    //Change text in input
    userEvent.type(input, 'Heelo, I am edited');

    // Send edited text
    const sendButton = container.getByTestId('chat-controls-send-button');
    userEvent.click(sendButton);
    const editedMessage = {
      text: 'Heelo, I am edited',
      createdAt: '2023-03-31T06:26:02.851Z',
      from: '63e7b7bfd2c2586ba49c4ba5',
      to: '63e7b7b5d2c2586ba49c4ba3',
      chatId: '642683897571e92726bdbcd1',
      edited: false,
      _id: '642683fe7571e92726bdbcf1',
      reactions: [],
      updatedAt: ''
    };

    act(() => store.dispatch(messagesActions.editMessage(editedMessage)));
    expect(message.querySelector('[data-testid="message-text"]')?.textContent).toEqual(
      'Heelo, I am edited'
    );

    // Expect "edited" indicator in message
    waitFor(() => {
      const edited = message.querySelector('[data-testid="message-meta-edited"]');
      expect(edited).not.toBeNull();
    });
  });

  it('Send message', async () => {
    const { container, store } = renderWithRedux(<Chat />, mockStore);
    const input = (await container.findByTestId('chat-controls-input')) as HTMLInputElement;
    expect(input.value).toEqual('');

    //Type text in input
    userEvent.type(input, 'Heelo, It is new message');
    waitFor(() => expect(input.value).toEqual('Heelo, It is new message'));

    // Send message
    const sendButton = container.getByTestId('chat-controls-send-button');
    userEvent.click(sendButton);
    const newdMessage = {
      text: 'Heelo, It is new message',
      createdAt: '2023-03-31T06:26:02.851Z',
      from: '63e7b7bfd2c2586ba49c4ba5',
      to: '63e7b7b5d2c2586ba49c4ba3',
      chatId: '642683897571e92726bdbcd1',
      edited: false,
      _id: '642683fe7571e92726bdbcf123432',
      reactions: [],
      updatedAt: ''
    };

    store.dispatch(messagesActions.newMessage(newdMessage));

    const newMessages = await container.findByText(/Heelo, It is new message/);
    expect(newMessages).toBeInTheDocument();
    const messages = await container.findAllByTestId(/message-container/);
    expect(messages.length).toBe(5);
  });
});
