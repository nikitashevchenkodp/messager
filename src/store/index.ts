import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './slices/UI';

const rootReducer = combineReducers({
  ui: uiReducer
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export const store = createStore();
