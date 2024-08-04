import { apiSlice } from "../apiSlice";
import { API_ENDPOINTS } from "../apiEndpoints";
import { IPatientResponse, IPatientUpdateRequest } from "@/interfaces/Profile";

const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientProfile: builder.query<IPatientResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.patient.profile,
      }),
      providesTags: ["PatientProfile"],
    }),
    updatePatientProfile: builder.mutation<
      { message: string },
      IPatientUpdateRequest
    >({
      query: (payload) => ({
        url: API_ENDPOINTS.patient.profile,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PatientProfile"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetPatientProfileQuery, useUpdatePatientProfileMutation } =
  authService;
