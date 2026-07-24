/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const audioBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllAudioBooks: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
      } = {}) => {
        const params = new URLSearchParams();

        if (keyword && keyword !== "All") {
          params.append("keyword", keyword);
        }
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/audio-book/other?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["audioBook"],
    }),

    getNewArrivalAudioBooks: builder.query({
      query: ({
        limit,
        page,
        skip,
      }: {
        limit?: number;
        page?: number;
        skip?: number;
      } = {}) => {
        const params = new URLSearchParams();
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/audio-book/new-arrivals?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["audioBook"],
    }),

    getPopularAudioBooks: builder.query({
      query: ({
        limit,
        page,
        skip,
      }: {
        limit?: number;
        page?: number;
        skip?: number;
      } = {}) => {
        const params = new URLSearchParams();
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());

        return {
          url: `/audio-book/popular?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["audioBook"],
    }),

    // createBook: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: `/book/create-book`,
    //     method: "POST",
    //     body: data,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["book"],
    // }),
  }),
});

export const {
  useGetAllAudioBooksQuery,
  useGetNewArrivalAudioBooksQuery,
  useGetPopularAudioBooksQuery,
} = audioBookApi;
