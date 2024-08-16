import { IResponse } from '@/interfaces';

import { API_ENDPOINTS } from './apiEndpoints';
import { apiSlice } from './apiSlice';

const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    savePushToken: builder.mutation<IResponse, { pushToken: string }>({
      query: (payload) => ({
        url: API_ENDPOINTS.user.savePushToken,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSavePushTokenMutation } = userService;
