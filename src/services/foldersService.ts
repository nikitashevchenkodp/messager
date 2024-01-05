import { axiosInstance } from './axiosInst';

type CreateFolderPayload = {
  folderName: string;
  chatId: string;
};
type EditFolderPayload = {
  folderName: string;
  folderId: string;
};
type DeleteFolderPayload = {
  folderId: string;
};
type AddChatToFolderPayload = {
  folderId: string;
  chatId: string;
};

class FoldersService {
  createFolder = async (payload: CreateFolderPayload) => {
    return axiosInstance.post('/api/folders/create', payload);
  };

  deleteFolder = async (payload: DeleteFolderPayload) => {
    return axiosInstance.post('/api/folders/delete', payload);
  };

  editFolder = async (payload: EditFolderPayload) => {
    return axiosInstance.post('/api/folders/edit', payload);
  };
  addChatToFolder = async (payload: AddChatToFolderPayload) => {
    return axiosInstance.post('/api/folders/add', payload);
  };

  getFoldersList = async () => {
    return axiosInstance.get('/api/folders/');
  };
}

export const foldersService = new FoldersService();
