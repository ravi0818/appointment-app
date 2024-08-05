import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@/interfaces';

import { API_ENDPOINTS } from '../apiEndpoints';
import { apiSlice } from '../apiSlice';

const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (payload) => ({
        url: API_ENDPOINTS.auth.login,
        method: 'POST',
        body: payload,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (payload) => ({
        url: API_ENDPOINTS.auth.register,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authService;
