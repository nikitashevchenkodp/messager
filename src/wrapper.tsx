import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'store';
import React from 'react';
import { render } from '@testing-library/react';

export const renderWithRedux = (Component: React.ReactNode, initialState: any) => {
  const store = createStore(initialState);
  const persistor = persistStore(store);
  const container = render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>{Component}</PersistGate>
    </Provider>
  );
  return { container, store };
};
