import axios from 'axios';
import { AUTH_TOKEN_KEY } from 'shared/consts/localStorage';

export const $API = axios.create({
  baseURL: __API__,
  headers: {
    Authorization: localStorage.getItem(AUTH_TOKEN_KEY) || '',
  },
});
