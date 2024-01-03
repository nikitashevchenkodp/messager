import axios from 'axios';
import { axiosInstance } from './axiosInst';

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
    return axiosInstance.post(`/api/users/login`, body, { withCredentials: true });
  };
  createUser = async (body: ISignup) => {
    return axiosInstance.post(`/api/users/create`, body, { withCredentials: true });
  };

  refreshAccessToken = () => {
    return axios.get(`/api/users/refresh`, { withCredentials: true });
  };
}

export const authService = new AuthService();
