import axios from 'axios';
import { axiosInstance } from './axiosInst';
import { serverLink } from './config';

interface LoginBody {
  email: string;
  password: string;
}

export interface ISignup {
  email: string;
  password: string;
  nickname: string;
  fullName: string;
}

class AuthService {
  login = async (body: LoginBody) => {
    return axios.post(`${serverLink}/api/users/login`, body, { withCredentials: true });
  };
  createUser = async (body: ISignup) => {
    return axios.post(`${serverLink}/api/users/create`, body, { withCredentials: true });
  };

  refreshAccessToken = () => {
    return axios.get(`${serverLink}/api/users/refresh`, { withCredentials: true });
  };
}

export const authService = new AuthService();
