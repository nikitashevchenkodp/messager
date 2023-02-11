import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Folder {
  name: string;
  unreadedNotifications: number;
}

interface UIInitState {
  folders: Array<Folder>;
  isLoading: boolean;
  isError: boolean;
  activeFolder: string;
}

const folders = [
  { name: 'Bots', unreadedNotifications: 0 },
  { name: 'Others', unreadedNotifications: 2 }
];

const initialState: UIInitState = {
  folders: [],
  isLoading: false,
  isError: false,
  activeFolder: 'All chats'
};

export const foldersSlice = createSlice({
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
      state.folders = action.payload.map((item) => {
        return { ...item, active: false };
      });
    },
    setActiveFolder: (state, action: PayloadAction<string>) => {
      state.activeFolder = action.payload;
    }
  }
});

export const foldersReducer = foldersSlice.reducer;
export const foldersActions = foldersSlice.actions;
