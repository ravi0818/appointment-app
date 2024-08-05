import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/redux/store';

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

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['PatientProfile'],
  endpoints: (builder) => ({}),
});
