import { baseApi } from "../../API/baseApi";

const consultantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllConsultants: builder.query({
            query: ({
                keyword,
                limit,
                page,
                skip,
                category,
            }: {
                keyword?: string;
                limit?: number;
                page?: number;
                skip?: number;
                category?: string;
            } = {}) => {
                const params = new URLSearchParams();

                // Handle keyword - skip if "All"
                if (keyword && keyword !== "All") {
                    params.append("keyword", keyword);
                }

                // Handle limit
                if (typeof limit === "number") params.append("limit", limit.toString());

                // Handle page
                if (typeof page === "number") params.append("page", page.toString());

                // Handle skip
                if (typeof skip === "number") params.append("skip", skip.toString());

                // Handle category - skip if "All" or empty
                if (category && category !== "All") {
                    params.append("category", category);
                }

                return {
                    url: `/consultant?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: ["consultant"],
        }),

        getConsultantsByCategory: builder.query({
            query: (category) => ({
                url: `/consultant/category/${category}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["consultant"],
        }),

        getSingleConsultant: builder.query({
            query: (id) => ({
                url: `/consultant/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["consultant"],
        }),

        // scheduleConsultation: builder.mutation({
        //   query: ({ data, id }) => ({
        //     url: `/consultation/schedule/${id}`,
        //     method: "PUT",
        //     body: data,
        //     credentials: "include",
        //   }),
        //   invalidatesTags: ["consultation"],
        // }),
    }),
});

export const {
    useGetAllConsultantsQuery,
    useGetConsultantsByCategoryQuery,
    useGetSingleConsultantQuery,
} = consultantApi;
