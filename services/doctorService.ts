import { IDoctorFormData, IDoctorResponse, IResponse } from '@/interfaces';

import { API_ENDPOINTS } from './apiEndpoints';
import { apiSlice } from './apiSlice';

const doctorService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveDoctor: builder.mutation<IResponse, IDoctorFormData>({
      query: (doctorData) => ({
        url: API_ENDPOINTS.doctor.addDoctor,
        method: 'POST',
        body: doctorData,
      }),
    }),
    updateDoctor: builder.mutation<IResponse, { id: string; doctorData: Partial<IDoctorFormData> }>({
      query: ({ id, doctorData }) => ({
        url: API_ENDPOINTS.doctor.updateDoctor(id),
        method: 'POST',
        body: doctorData,
      }),
    }),
    deleteDoctor: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: API_ENDPOINTS.doctor.deleteDoctor(id),
        method: 'DELETE',
      }),
    }),
    getDoctorsByUserId: builder.query<IResponse<IDoctorResponse[]>, void>({
      query: () => ({
        url: API_ENDPOINTS.doctor.getDoctors,
        method: 'GET',
      }),
    }),
    getAllDoctors: builder.query<IResponse<IDoctorResponse[]>, void>({
      query: () => ({
        url: API_ENDPOINTS.doctor.getAllDoctors,
        method: 'GET',
      }),
    }),

    getDoctorById: builder.query<IResponse<IDoctorResponse>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.doctor.getDoctorById(id),
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useGetDoctorsByUserIdQuery,
  useGetAllDoctorsQuery,
  useGetDoctorByIdQuery,
} = doctorService;
