// src/redux/Features/Chat/chatApi.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ========== CHAT CRUD ==========

        // Create new chat
        createChat: builder.mutation<any, { title?: string; initialMessage?: string; category?: string }>({
            query: (data) => ({
                url: `/ai-chat`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["aiChat"],
        }),

        // Get all user chats
        getMyChatHistory: builder.query<any, { page?: number; limit?: number; search?: string; category?: string; sortBy?: string }>({
            query: (params) => ({
                url: `/ai-chat/my`,
                method: "GET",
                params,
                credentials: "include",
            }),
            providesTags: ["aiChat"],
        }),

        // Get single chat by ID
        getChatById: builder.query<any, string>({
            query: (chatId) => ({
                url: `/ai-chat/${chatId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, id) => [{ type: "aiChat", id }],
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
        sendMessage: builder.mutation<any, { chatId: string; message: string; language?: string; category?: string }>({
            query: ({ chatId, ...body }) => ({
                url: `/ai-chat/${chatId}/message`,
                method: "POST",
                body,
                credentials: "include",
            }),
            invalidatesTags: (result) => [{ type: "aiChat", id: result?.chatId }],
        }),

        // Regenerate last message
        regenerateMessage: builder.mutation<any, { chatId: string }>({
            query: ({ chatId }) => ({
                url: `/ai-chat/${chatId}/regenerate`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
            invalidatesTags: (result) => [{ type: "aiChat", id: result?.chatId }],
        }),
    }),
});

export const {
    useCreateChatMutation,
    useGetMyChatHistoryQuery,
    useGetChatByIdQuery,
    useUpdateChatTitleMutation,
    useDeleteChatMutation,
    useDeleteAllChatsMutation,
    useSendMessageMutation,
    useRegenerateMessageMutation,
} = chatApi;