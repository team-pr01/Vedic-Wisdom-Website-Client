/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postEmergencyMessage: builder.mutation<any, any>({
      query: (data) => ({
        url: `/emergency/post`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["emergencies"],
    }),
  }),
});

export const {
  usePostEmergencyMessageMutation
} = menuApi;
