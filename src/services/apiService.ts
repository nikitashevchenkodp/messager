import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { store } from 'store';

export interface IMessage {
  from: string;
  to: string;
  messageText: string;
  chatId: string;
  _id: string;
  _v: 0;
  createdAt: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export const axiosInst = axios.create({
  baseURL: 'http://192.168.0.10:5002'
});

axiosInst.interceptors.request.use((config: any) => {
  const { _id } = store.getState().authentication.user;
  return {
    ...config,
    headers: { ...config.headers, authorization: _id || '' }
  };
});

export const login = async (body: ILogin) => {
  return axios.post('http://192.168.0.10:5002/api/users/login', body);
};

export const sendMessage = async (body: Omit<IMessage, '_id' | '_v' | 'createdAt'>) => {
  return axiosInst.post('/api/messages/send', body);
};

export const getChatList = async () => {
  return axiosInst.get('/api/chats');
};

export const getChatMessages = async (chatId: string) => {
  return axiosInst.get(`/api/chats/${chatId}`);
};
export const getAllUsers = async () => {
  return axiosInst.get(`/api/users/`);
};
