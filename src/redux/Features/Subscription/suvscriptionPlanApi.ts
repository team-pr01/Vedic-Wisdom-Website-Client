import { baseApi } from "../../API/baseApi";

const subscriptionPlanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllActiveSubscriptionPlans: builder.query({
            query: ({
                limit,
                page,
                skip,
            }: {
                limit?: number;
                page?: number;
                skip?: number;
                category?: string;
            } = {}) => {
                const params = new URLSearchParams();
                if (typeof limit === "number") params.append("limit", limit.toString());
                if (typeof page === "number") params.append("page", page.toString());
                if (typeof skip === "number") params.append("skip", skip.toString());

                return {
                    url: `/subscription-plan/active-plans?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["subscriptionPlan"],
        }),
    }),
});

export const {
    useGetAllActiveSubscriptionPlansQuery
} = subscriptionPlanApi;
