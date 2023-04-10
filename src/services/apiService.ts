import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { serverLink } from 'consts/externalLinks';
import { store } from 'store';
import { authenticationActions } from 'store/slices/authentication';

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
export interface ISignup {
  email: string;
  password: string;
  nickname: string;
  fullName: string;
}

export const axiosInst = axios.create({
  baseURL: serverLink,
  withCredentials: true
});

axiosInst.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('accessToken');
  return {
    ...config,
    headers: { ...config.headers, authorization: token }
  };
});

axiosInst.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status == 401 && err.config && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const res = await axios.get(`${serverLink}/api/users/refresh`, { withCredentials: true });
        localStorage.setItem('accessToken', res.data.accessToken);
        store.dispatch(authenticationActions.loginUser(res.data));
        return axiosInst.request(originalRequest);
      } catch (error) {
        localStorage.removeItem('accessToken');
        store.dispatch(authenticationActions.setIsAuth(false));
      }
    }
    return Promise.reject(err);
  }
);

export const login = async (body: ILogin) => {
  return axios.post(`${serverLink}/api/users/login`, body, { withCredentials: true });
};
export const createUser = async (body: ISignup) => {
  return axios.post(`${serverLink}/api/users/create`, body, { withCredentials: true });
};

export const getChatList = async () => {
  return axiosInst.get('/api/chats');
};
export const getChat = async (chatId: string) => {
  return axiosInst.get(`/api/chats/${chatId}`);
};

export const getChatMessages = async (chatId = '') => {
  const res = await axiosInst.get(`/api/messages/${chatId}`);
  return res;
};
export const getAllUsers = async () => {
  return axiosInst.get(`/api/users/`);
};
