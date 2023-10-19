import axios from 'axios';
import { AUTH_TOKEN_KEY } from '@/shared/consts/localStorage';

export const $API = axios.create({
  baseURL: __API__,
});

$API.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(AUTH_TOKEN_KEY) || '';
  }

  return config;
});
