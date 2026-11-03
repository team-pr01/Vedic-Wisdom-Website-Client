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

        getMyAllProgress: builder.query({
            query: () => ({
                url: `/quiz-progress/my-progress`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quiz"],
        }),

        getLeaderboardOfAQuiz: builder.query({
            query: (quizId) => ({
                url: `/quiz-progress/${quizId}/leaderboard`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["quiz"],
        }),

        submitPaymentDetails: builder.mutation<any, any>({
            query: ({ quizId, data }) => ({
                url: `/quiz-progress/submit-payment-details/${quizId}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["quiz"],
        }),

        submitCoinRequest: builder.mutation<any, any>({
            query: ({ quizId, data }) => ({
                url: `/quiz-progress/submit-coin-request/${quizId}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["quiz"],
        }),
    }),
});

export const {
    useGetMyProgressQuery,
    useGetMyAllProgressQuery,
    useGetLeaderboardOfAQuizQuery,
    useSubmitPaymentDetailsMutation,
    useSubmitCoinRequestMutation,
} = quizProgressApi;
