import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import { foldersReducer } from 'features/folders';
import createSagaMiddleware from 'redux-saga';

import { uiSettingsReducer } from './slices/UI';
import { chatsReducer } from 'features/chat/redux/chat';
import { authenticationReducer as authentication } from './slices/authentication';
import { rootSaga } from './sagas';
import { onlineReducer as online } from './slices/usersStatuses';
import { snackbarReducer } from './slices/snackbar';
import { chatListReducer } from 'features/chat-list';
import { activeEntitiesReducer } from './slices/activeEntities';

const ui = combineReducers({
  uiSettings: uiSettingsReducer,
  snackbar: snackbarReducer
});

const entities = combineReducers({
  folders: foldersReducer,
  chatList: chatListReducer,
  chats: chatsReducer,
  active: activeEntitiesReducer
});

const rootReducer = combineReducers({
  ui,
  entities,
  authentication,
  online
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['entities', 'online', 'ui']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
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
