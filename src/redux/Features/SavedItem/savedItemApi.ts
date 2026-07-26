import { baseApi } from "../../API/baseApi";

const savedItemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMySavedItems: builder.query({
            query: ({
                itemType
            }: {
                itemType?: string;
            } = {}) => {
                const params = new URLSearchParams();
                if (itemType && itemType !== "") {
                    params.append("itemType", itemType);
                }

                return {
                    url: `/saved-item/my?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["savedItem"],
        }),

        getMySavedItemsCount: builder.query({
            query: () => ({
                url: `/saved-item/saved-item-count`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["savedItem"],
        }),

        saveItem: builder.mutation({
            query: (data) => ({
                url: `/saved-item/save`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["savedItem"],
        }),

        unSaveItem: builder.mutation({
            query: ({ itemId, itemType }) => ({
                url: `/saved-item/unsave/${itemId}/${itemType}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["savedItem"],
        }),

    }),
});

export const {
    useGetMySavedItemsQuery,
    useGetMySavedItemsCountQuery,
    useSaveItemMutation,
    useUnSaveItemMutation,
} = savedItemApi;
