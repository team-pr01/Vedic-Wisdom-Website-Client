import { baseApi } from "../../API/baseApi";

const consultationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookConsultation: builder.mutation({
      query: (data) => ({
        url: `/consultation/book`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["consultation"],
    }),
  }),
});

export const {
  useBookConsultationMutation,
} = consultationApi;
