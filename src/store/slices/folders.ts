import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFolder } from 'store/interfaces';
import { arrayOfIds, arrayToObject } from 'utils/arrToObj';

const mockFolders: IFolder[] = [
  {
    id: '0',
    name: 'Work',
    includedChatIds: ['123', '6432e821fdda739c9675f093', '343']
  },
  {
    id: '1',
    name: 'Study',
    includedChatIds: ['123', '324', '343']
  },
  {
    id: '2',
    name: 'News',
    includedChatIds: ['123', '324', '343']
  }
];

interface IInitialState {
  byId: {
    [id: string]: IFolder;
  };
  folderIds: string[];
}

const initialState = {
  byId: arrayToObject(mockFolders, 'id'),
  folderIds: arrayOfIds(mockFolders, 'id')
} as IInitialState;

const folders = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<IFolder[]>) => {
      state.byId = arrayToObject(action.payload, 'id');
      state.folderIds = arrayOfIds(action.payload, 'id');
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
      state.folderIds = state.folderIds.filter((folderId) => folderId !== id);
    },
    addChatTofolders: (state, action: PayloadAction<{ folderIds: string[]; chatId: string }>) => {
      const { chatId, folderIds } = action.payload;
      for (const folderId of folderIds) {
        state.byId[folderId].includedChatIds.push(chatId);
      }
    }
  }
});

export const foldersActions = folders.actions;
export const foldersReducer = folders.reducer;
