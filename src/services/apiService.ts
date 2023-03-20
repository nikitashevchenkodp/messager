import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { serverLink } from 'consts/externalLinks';
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
  baseURL: serverLink
});

axiosInst.interceptors.request.use((config: any) => {
  const { _id } = store.getState().authentication.user;
  return {
    ...config,
    headers: { ...config.headers, authorization: _id || '' }
  };
});

export const login = async (body: ILogin) => {
  return axios.post(`${serverLink}/api/users/login`, body);
};

export const sendMessage = () => console.log('sended');

export const getChatList = async () => {
  return axiosInst.get('/api/chats');
};
export const getChat = async (chatId: string) => {
  return axiosInst.get(`/api/chats/${chatId}`);
};

export const getChatMessages = async (chatId = '') => {
  const res = await axiosInst.get(`/api/messages/${chatId}`);
  console.log(res);

  return res;
};
export const getAllUsers = async () => {
  return axiosInst.get(`/api/users/`);
};
