import { rtkAPI } from '@/shared/API/rtkAPI';
import { Notification } from '../model/types';

const notificationsAPI = rtkAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], string | undefined>({
      query: (id) => ({
        url: '/notifications',
        params: {
          userId: id,
        },
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsAPI;
