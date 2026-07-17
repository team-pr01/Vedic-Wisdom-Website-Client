import { baseApi } from "../../API/baseApi";

const consultantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllConsultants: builder.query({
            query: (params) => {
                let queryStr = "";
                if (params) {
                    const queryParams = new URLSearchParams();
                    if (params.keyword) queryParams.append("keyword", params.keyword);
                    if (params.category) queryParams.append("category", params.category);
                    if (params.status) queryParams.append("status", params.status);
                    queryStr = `?${queryParams.toString()}`;
                }
                return {
                    url: `/consultant${queryStr}`,
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
