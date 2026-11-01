/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const quizApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: ({
        keyword,
        name,
        limit,
        page,
        skip,
        type,
      }: {
        keyword?: string;
        name?: string;
        limit?: number;
        page?: number;
        skip?: number;
        type?: string;
      } = {}) => {
        const params = new URLSearchParams();

        // Handle keyword - skip if "All"
        if (keyword && keyword !== "All") {
          params.append("keyword", keyword);
        }

        // Handle name - skip if "All"
        if (name && name !== "All") {
          params.append("name", name);
        }

        // Handle limit
        if (typeof limit === "number") params.append("limit", limit.toString());

        // Handle page
        if (typeof page === "number") params.append("page", page.toString());

        // Handle skip
        if (typeof skip === "number") params.append("skip", skip.toString());

        // Handle type - skip if "All" or empty
        if (type && type !== "All") {
          params.append("type", type);
        }

        return {
          url: `/quiz/active?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["food"],
    }),

    getSingleQuizById: builder.query({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["quiz"],
    }),

    getQuizQuestionsByLevelNo: builder.query({
      query: ({quizId, levelNo}) => ({
        url: `/quiz/${quizId}/level/${levelNo}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["quiz"],
    }),

    startQuiz: builder.mutation<any, any>({
      query: (quizId) => ({
        url: `/quiz/start/${quizId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),

    submitLevelAnswers: builder.mutation<any, any>({
      query: ({data, quizId, levelNo}) => ({
        url: `/quiz/submit/${quizId}/level/${levelNo}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),

    addQuizByAI: builder.mutation<any, any>({
      query: (data) => ({
        url: `/ai/generate-quiz`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),

    deleteQuiz: builder.mutation<any, string>({
      query: (id) => ({
        url: `/quiz/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["quiz"],
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetSingleQuizByIdQuery,
  useGetQuizQuestionsByLevelNoQuery,
  useStartQuizMutation,
  useSubmitLevelAnswersMutation,
  useAddQuizByAIMutation,
  useDeleteQuizMutation,
} = quizApi;
