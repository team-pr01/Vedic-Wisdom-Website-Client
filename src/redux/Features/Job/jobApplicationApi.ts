/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const jobApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyApplications: builder.query({
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
                    url: `/application/my?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["job", "application"],
        }),

        applyOnJob: builder.mutation<any, any>({
            query: (data) => ({
                url: `/application/apply`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["job", "application"],
        }),
    }),
});

export const {
    useGetMyApplicationsQuery,
    useApplyOnJobMutation
} = jobApplicationApi;
