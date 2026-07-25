/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const coinPackageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCoinPackages: builder.query({
            query: ({
                limit,
                page,
                skip,
            }: {
                limit?: number;
                page?: number;
                skip?: number;
            } = {}) => {
                const params = new URLSearchParams();
                if (typeof limit === "number") params.append("limit", limit.toString());
                if (typeof page === "number") params.append("page", page.toString());
                if (typeof skip === "number") params.append("skip", skip.toString());

                return {
                    url: `/coin-package/all?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["coinPackage"],
        }),

        generateRecipe: builder.mutation<any, any>({

            query: (data) => ({
                url: `/ai/generate-recipe`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["book"],
        }),
    }),
});

export const {
    useGetAllCoinPackagesQuery,
    useGenerateRecipeMutation
} = coinPackageApi;
