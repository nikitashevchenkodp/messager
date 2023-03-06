/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

interface INotification {
  message: string;
  options: OptionsObject;
  dismissed: boolean;
}

interface UIInitState {
  notifications: Array<INotification>;
}

const initialState: UIInitState = {
  notifications: []
};

export const snackbar = createSlice({
  name: 'shackbar',
  initialState,
  reducers: {
    // addToDisplayed: (state, action: PayloadAction<string>) => {
    //   state.displayed.push(action.payload);
    // },
    // removeFromDisplayed: (state, action: PayloadAction<string>) => {
    //   state.displayed.filter((item) => item === action.payload);
    // },
    enqueueSnackbar: (state, action: PayloadAction<any>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    closeNotification: (state, action: PayloadAction<any>) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification.options.key === action.payload) {
          return { ...notification, dismissed: true };
        }
        return notification;
      });
    },
    removeNotification: (state, action: PayloadAction<any>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.options.key !== action.payload
      );
    }
  }
});

export const snackbarReducer = snackbar.reducer;
export const snackbarActions = snackbar.actions;
