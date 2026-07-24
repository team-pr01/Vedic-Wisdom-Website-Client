import { baseApi } from "../../API/baseApi";

const audioTrackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAudioTrackByBookId: builder.query({
      query: (id) => ({
        url: `/audio-track/book/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["audioTrack"],
    }),
  }),
});

export const {
  useGetAllAudioTrackByBookIdQuery
} = audioTrackApi;
