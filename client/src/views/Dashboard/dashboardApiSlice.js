import { apiSlice } from "../../api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDate: builder.query({
      query: () => "/date",
    }),
  }),
});

export const { useGetDateQuery } = dashboardApiSlice;
