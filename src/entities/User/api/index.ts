import { rtkAPI } from '@/shared/API/rtkAPI';
import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface WriteJsonSettingsOptions {
  userId: string;
  settings: JsonSettings;
}

const userAPI = rtkAPI.injectEndpoints({
  endpoints: (builder) => ({
    writeJsonSettings: builder.mutation<User, WriteJsonSettingsOptions>({
      query: ({ settings, userId }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings: settings,
        },
      }),
    }),
    getUserDataById: builder.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const writeJsonSettingsMutation = userAPI.endpoints.writeJsonSettings.initiate;
export const getUserDataByIdQuery = userAPI.endpoints.getUserDataById.initiate;
