/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const ragApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        askQuestion: builder.mutation<any, any>({
            query: (data) => ({
                url: `/vedic-knowledge/ask`,
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8',
                },
                credentials: "include",
            }),
            invalidatesTags: ["rag"],
        }),

        rateAnswer: builder.mutation<any, any>({
            query: ({ id, data }) => ({
                url: `/vedic-knowledge/rate/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["product"],
        }),
    }),
});

export const {
    useAskQuestionMutation,
    useRateAnswerMutation
} = ragApi;
