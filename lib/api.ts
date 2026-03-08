import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.get<T>(url, config);

export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  axiosInstance.post<T>(url, data, config);

export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  axiosInstance.put<T>(url, data, config);

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  axiosInstance.delete<T>(url, config);
