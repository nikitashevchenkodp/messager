/* eslint-disable @typescript-eslint/no-empty-function */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import { foldersReducer } from 'features/folders';
import createSagaMiddleware from 'redux-saga';

import { uiSettingsReducer } from './slices/UI';
import { messagesReducer } from 'features/chat/redux/chat';
import { authenticationReducer as authentication } from './slices/authentication';
import { rootSaga } from './sagas';
import { usersReducer as users } from './slices/usersStatuses';
import { snackbarReducer } from './slices/snackbar';
import { chatsReducer } from 'features/chat-list';
import { activeEntitiesReducer } from './slices/activeEntities';

const ui = combineReducers({
  uiSettings: uiSettingsReducer,
  snackbar: snackbarReducer
});

const entities = combineReducers({
  folders: foldersReducer,
  chats: chatsReducer,
  messages: messagesReducer,
  active: activeEntitiesReducer
});

const rootReducer = combineReducers({
  ui,
  entities,
  authentication,
  users
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['entities', 'online', 'ui']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const createStore = (initState = {}) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState: initState,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: false
      }),
      sagaMiddleware
    ]
  });
};

export const store = createStore();
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
