import axios, { AxiosRequestConfig, GenericAbortSignal, InternalAxiosRequestConfig } from 'axios';
import { store } from 'store';
import { userActions } from 'store/slices';
import { authService } from './authService';
import { serverIp } from './config';

export const axiosInstance = axios.create({
  baseURL: serverIp,
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
    console.log('interceptor');

    if (err?.response?.status == 401 && originalRequest && !originalRequest._isRetry) {
      console.log('in condition');

      originalRequest._isRetry = true;
      try {
        const res = await authService.refreshAccessToken();
        store.dispatch(userActions.setAccessToken(res.data.accessToken));
        store.dispatch(userActions.setUser(res.data.user));
        return axiosInstance.request(originalRequest);
      } catch (error) {
        store.dispatch(userActions.setIsAuth(false));
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);
