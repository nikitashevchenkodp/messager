import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chatsReducer, uiReducer } from './slices';

const entitiesReducer = combineReducers({
  chats: chatsReducer
});

const rootReducer = combineReducers({
  ui: uiReducer,
  entities: entitiesReducer
});

export const createStore = (init?: Record<string, unknown>) => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
