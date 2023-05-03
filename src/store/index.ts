import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './slices';

const rootReducer = combineReducers({
  ui: uiReducer
});

export const createStore = (init?: Record<string, unknown>) => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
