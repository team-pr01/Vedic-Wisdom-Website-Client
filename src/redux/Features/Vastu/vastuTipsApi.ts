import { baseApi } from "../../API/baseApi";

const vastuTipsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVastuTips: builder.query({
      query: () => ({
        url: `/vastu-tips`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastuTips"],
    }),
  }),
});

export const {
  useGetAllVastuTipsQuery,
} = vastuTipsApi;
