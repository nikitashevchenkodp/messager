import { GenericAbortSignal } from 'axios';
import { axiosInstance } from './axiosInst';

export const getChats = () => axiosInstance.get('/api/chats');
export const getAllMessagesByChatId = (chatId: string) =>
  axiosInstance.get(`/api/messages/${chatId}`);

export const getUsers = () => axiosInstance.get('/api/users/');
