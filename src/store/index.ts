import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import { chatsReducer } from 'features/chat-list';
import { foldersReducer } from 'features/folders';
import createSagaMiddleware from 'redux-saga';

import { uiReducer } from './slices/UI';
import { chatAreaReducer } from 'features/chat/redux/chatArea';
import { authenticationReducer } from './slices/authentication';
import { rootSaga } from './sagas';

const rootReducer = combineReducers({
  ui: uiReducer,
  folders: foldersReducer,
  chats: chatsReducer,
  chatArea: chatAreaReducer,
  authentication: authenticationReducer
});

const persistConfig = {
  key: 'root',
  storage
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
