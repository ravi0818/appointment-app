import { IPatientResponse, IPatientUpdateRequest } from '@/interfaces/Profile';

import { API_ENDPOINTS } from '../apiEndpoints';
import { apiSlice } from '../apiSlice';

const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientProfile: builder.query<IPatientResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.patient.profile,
        method: 'GET',
      }),
      providesTags: ['PatientProfile'],
    }),
    updatePatientProfile: builder.mutation<{ message: string }, IPatientUpdateRequest>({
      query: (payload) => ({
        url: API_ENDPOINTS.patient.profile,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PatientProfile'],
    }),
  }),
});

export const { useGetPatientProfileQuery, useUpdatePatientProfileMutation } = authService;
