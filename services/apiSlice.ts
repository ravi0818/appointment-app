import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.153:5000/api/" }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
