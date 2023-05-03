import { Provider } from 'react-redux';
import { createStore } from 'store';
import React from 'react';
import { render } from '@testing-library/react';

export const renderWithRedux = (Component: React.ReactNode, initialState = {}) => {
  const store = createStore(initialState);
  const container = render(<Provider store={store}>{Component}</Provider>);
  return { container, store };
};
