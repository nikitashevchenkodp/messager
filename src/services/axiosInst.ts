import axios, { AxiosRequestConfig, GenericAbortSignal, InternalAxiosRequestConfig } from 'axios';
import { store } from 'store';
import { userActions } from 'store/slices';
import { authService } from './authService';
import { serverLink } from './config';

export const axiosInstance = axios.create({
  baseURL: serverLink,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig): any => {
  const token = store.getState().user.accessToken;
  return {
    ...config,
    headers: { ...config.headers, authorization: token }
  };
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if (err?.response?.status == 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      console.log('here only once');
      try {
        const res = await authService.refreshAccessToken();
        console.log(res);
        store.dispatch(userActions.setAccessToken(res.data.accessToken));
        store.dispatch(userActions.setUser(res.data.user));
        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);
        store.dispatch(userActions.setIsAuth(false));
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);
