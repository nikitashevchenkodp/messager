import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  chatsReducer,
  foldersReducer,
  messagesReducer,
  uiReducer,
  userReducer,
  usersReducer
} from './slices';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

const entitiesReducer = combineReducers({
  chats: chatsReducer,
  messages: messagesReducer,
  users: usersReducer,
  folders: foldersReducer
});

const rootReducer = combineReducers({
  entities: entitiesReducer,
  user: userReducer,
  ui: uiReducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['entities', 'ui']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (init?: Record<string, unknown>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });
};

export const store = createStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
