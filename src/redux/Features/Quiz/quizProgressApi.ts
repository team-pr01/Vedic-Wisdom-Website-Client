/* eslint-disable @typescript-eslint/no-explicit-any */
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
    }),
});

export const {
    useGetMyProgressQuery,
} = quizProgressApi;
