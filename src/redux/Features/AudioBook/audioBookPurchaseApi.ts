/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const audioBookPurchaseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyPurchasedAudioBooks: builder.query({
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
                    url: `/audio-book-purchase/my?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["audioBookPurchase"],
        }),

        purchaseAudioBook: builder.mutation<any, any>({
            query: (data) => ({
                url: `/audio-book-purchase/purchase`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["audioBookPurchase"],
        }),

        // Check if user owns an audio book
        checkOwnership: builder.query({
            query: (id) => ({
                url: `/audio-book-purchase/check/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["audioBookPurchase"],
        }),
    }),
});

export const {
    useGetMyPurchasedAudioBooksQuery,
    usePurchaseAudioBookMutation,
    useCheckOwnershipQuery,
} = audioBookPurchaseApi;
