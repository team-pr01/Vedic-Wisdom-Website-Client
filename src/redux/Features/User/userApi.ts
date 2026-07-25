import { baseApi } from "../../API/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getMe: builder.query({
            query: () => ({
                url: `/user/me`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["user"],
        }),


        updateProfile: builder.mutation({
            query: (data) => ({
                url: `/user/update-profile`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["user"],
        }),

    }),
});

export const {
    useGetMeQuery,
    useUpdateProfileMutation
} = userApi;
