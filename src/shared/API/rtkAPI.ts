import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_TOKEN_KEY } from '@/shared/consts/localStorage';

export const rtkAPI = createApi({
  reducerPath: 'nothinggApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY) || '';

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
