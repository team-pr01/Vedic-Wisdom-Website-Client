// src/redux/Features/Chat/chatApi.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMyChatHistory: builder.query({
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

                // Handle keyword - skip if "All"
                if (keyword) {
                    params.append("keyword", keyword);
                }
                if (typeof limit === "number") params.append("limit", limit.toString());
                if (typeof page === "number") params.append("page", page.toString());
                if (typeof skip === "number") params.append("skip", skip.toString());

                return {
                    url: `/ai-chat/my?${params.toString()}`,
                    method: "GET",
                    headers: {
                        'Accept': 'application/json; charset=utf-8',
                    },
                    credentials: "include",
                };
            },
            providesTags: ["aiChat"],
        }),

        // Get single chat by ID
        getChatById: builder.query<any, string>({
            query: (chatId) => ({
                url: `/ai-chat/${chatId}`,
                method: "GET",
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                },
                credentials: "include",
            }),
            providesTags: ["aiChat"],
        }),

        // Update chat title
        updateChatTitle: builder.mutation<any, { chatId: string; title: string }>({
            query: ({ chatId, title }) => ({
                url: `/ai-chat/${chatId}/title`,
                method: "PATCH",
                body: { title },
                credentials: "include",
            }),
            invalidatesTags: ["aiChat"],
        }),

        // Delete chat
        deleteChat: builder.mutation<any, string>({
            query: (chatId) => ({
                url: `/ai-chat/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["aiChat"],
        }),

        // Delete all chats
        deleteAllChats: builder.mutation<any, void>({
            query: () => ({
                url: `/ai-chat`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["aiChat"],
        }),

        // ========== CHAT MESSAGING ==========

        // Send message in chat
        sendMessage: builder.mutation<any, any>({
            query: (data) => ({
                url: `/ai-chat/ask`,
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8',
                },
                credentials: "include",
            }),
            invalidatesTags: (result) => [{ type: "aiChat", id: result?.chatId }],
        }),

        // Regenerate last message
        // regenerateMessage: builder.mutation<any, { chatId: string }>({
        //     query: ({ chatId }) => ({
        //         url: `/ai-chat/${chatId}/regenerate`,
        //         method: "POST",
        //         body: {},
        //         headers: {
        //             'Content-Type': 'application/json; charset=utf-8',
        //             'Accept': 'application/json; charset=utf-8',
        //         },
        //         credentials: "include",
        //     }),
        //     invalidatesTags: (result) => [{ type: "aiChat", id: result?.chatId }],
        // }),
    }),
});

export const {
    useGetMyChatHistoryQuery,
    useGetChatByIdQuery,
    useUpdateChatTitleMutation,
    useDeleteChatMutation,
    useDeleteAllChatsMutation,
    useSendMessageMutation,
    // useRegenerateMessageMutation,
} = chatApi;