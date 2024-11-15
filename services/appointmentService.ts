import { IResponse } from '@/interfaces';
import {
  IAppointment,
  IAppointmentRequest,
  ICancelAppointmentRequest,
  IGetDoctorAppointmentsRequest,
} from '@/interfaces';

import { API_ENDPOINTS } from './apiEndpoints';
import { apiSlice } from './apiSlice';

const appointmentService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bookAppointment: builder.mutation<IResponse<IAppointment>, IAppointmentRequest>({
      query: (payload) => ({
        url: API_ENDPOINTS.appointment.bookAppointment,
        method: 'POST',
        body: payload,
      }),
    }),
    getUserAppointments: builder.query<IResponse<IAppointment[]>, void>({
      query: () => ({
        url: API_ENDPOINTS.appointment.getUserAppointments,
        method: 'GET',
      }),
    }),
    cancelAppointment: builder.mutation<IResponse<IAppointment>, ICancelAppointmentRequest>({
      query: ({ appointmentId }) => ({
        url: API_ENDPOINTS.appointment.cancelAppointment(appointmentId),
        method: 'PATCH',
      }),
    }),
    getDoctorAppointmentsByDate: builder.query<IResponse<IAppointment[]>, IGetDoctorAppointmentsRequest>({
      query: ({ doctorId, date }) => ({
        url: API_ENDPOINTS.appointment.getDoctorAppointmentsByDate(doctorId, date),
        method: 'GET',
        params: { date },
      }),
    }),
    deleteAppointment: builder.mutation<IResponse, { appointmentId: string }>({
      query: ({ appointmentId }) => ({
        url: API_ENDPOINTS.appointment.deleteAppointment(appointmentId),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useBookAppointmentMutation,
  useGetUserAppointmentsQuery,
  useCancelAppointmentMutation,
  useGetDoctorAppointmentsByDateQuery,
  useDeleteAppointmentMutation,
} = appointmentService;
