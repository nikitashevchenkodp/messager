import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Folder {
  name: string;
  unreadedNotifications: number;
}

interface UIInitState {
  items: Array<Folder>;
  isLoading: boolean;
  isError: boolean;
}

const foldersMock = [
  { name: 'Bots', unreadedNotifications: 0 },
  { name: 'Others', unreadedNotifications: 2 }
];

const initialState: UIInitState = {
  items: [],
  isLoading: false,
  isError: false
};

export const folders = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.items = action.payload.map((item) => {
        return { ...item, active: false };
      });
    }
  }
});

export const foldersReducer = folders.reducer;
export const foldersActions = folders.actions;
