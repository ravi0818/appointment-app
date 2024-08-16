import { IAvailabilityRequest, IResponse, ISlotsRequest, ISlotsResponse } from '@/interfaces';

import { API_ENDPOINTS } from './apiEndpoints';
import { apiSlice } from './apiSlice';

const availabilityService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAvailability: builder.mutation<IResponse, IAvailabilityRequest>({
      query: (payload) => ({
        url: API_ENDPOINTS.availability.create,
        method: 'POST',
        body: payload,
      }),
    }),
    getDoctorAvailability: builder.query<IResponse, string>({
      query: (doctorId) => ({
        url: API_ENDPOINTS.availability.getDoctorAvailability(doctorId),
        method: 'GET',
      }),
    }),
    updateAvailability: builder.mutation<
      IResponse,
      {
        availabilityId: string;
        updateData: Partial<{ day: string; startTime: string; endTime: string; maxAppointments: number }>;
      }
    >({
      query: ({ availabilityId, updateData }) => ({
        url: API_ENDPOINTS.availability.update(availabilityId),
        method: 'PUT',
        body: updateData,
      }),
    }),
    deleteAvailability: builder.mutation<IResponse, { availabilityId: string }>({
      query: ({ availabilityId }) => ({
        url: API_ENDPOINTS.availability.delete(availabilityId),
        method: 'DELETE',
      }),
    }),
    getRemainingSlots: builder.query<IResponse<ISlotsResponse>, ISlotsRequest>({
      query: ({ availabilityId, date }) => ({
        url: API_ENDPOINTS.availability.getRemainingSlots(availabilityId, date),
        method: 'GET',
        keepUnusedDataFor: 0,
      }),
    }),
  }),
});

export const {
  useCreateAvailabilityMutation,
  useGetDoctorAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useDeleteAvailabilityMutation,
  useGetRemainingSlotsQuery,
} = availabilityService;
