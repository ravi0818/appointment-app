import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/auth';
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://192.168.0.153:5000/api/';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const dispatch = api.dispatch as ReturnType<typeof useAppDispatch>;
    await dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['PatientProfile', 'ClinicProfile'],
  endpoints: (builder) => ({}),
});
