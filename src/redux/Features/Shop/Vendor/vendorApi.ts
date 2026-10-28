/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../../API/baseApi";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    becomeAVendor: builder.mutation<any, any>({
      query: (data) => ({
        url: `/vendor/apply`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vendor"],
    }),

    getMyStats: builder.query({
      query: () => ({
        url: `/vendor/my-stats`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vendor"],
    }),


  }),
});

export const {
  useBecomeAVendorMutation,
  useGetMyStatsQuery
} = vendorApi;
