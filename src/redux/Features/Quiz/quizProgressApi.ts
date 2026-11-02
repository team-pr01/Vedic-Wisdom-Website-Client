import { baseApi } from "../../API/baseApi";

const quizProgressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProgress: builder.query({
            query: (quizId) => ({
                url: `/quiz-progress/${quizId}/progress`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quiz"],
        }),

        getMyAllProgress: builder.query({
            query: () => ({
                url: `/quiz-progress/my-progress`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quiz"],
        }),
    }),
});

export const {
    useGetMyProgressQuery,
    useGetMyAllProgressQuery,
} = quizProgressApi;
