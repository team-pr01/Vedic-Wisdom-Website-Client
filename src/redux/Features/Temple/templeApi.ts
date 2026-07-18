import { baseApi } from "../../API/baseApi";

const templeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTemple: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
        country,
        state,
        city,
        category,
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
        country?: string;
        state?: string;
        city?: string;
        category?: string;
      } = {}) => {
        const params = new URLSearchParams();

        // Handle keyword - skip if "All"
        if (keyword && keyword !== "All") {
          params.append("keyword", keyword);
        }
        if (typeof limit === "number") params.append("limit", limit.toString());
        if (typeof page === "number") params.append("page", page.toString());
        if (typeof skip === "number") params.append("skip", skip.toString());
        if (country) params.append("country", country);
        if (state) params.append("state", state);
        if (city) params.append("city", city);
        if (category && category !== "All" && category !== "") {
          params.append("category", category);
        }

        return {
          url: `/temple?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["temple"],
    }),

    getSingleTemple: builder.query({
      query: (id) => ({
        url: `/temple/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["temple"],
    }),


    addTemple: builder.mutation({
      query: (data) => ({
        url: `/temple/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["users"],
    }),

  }),
});

export const {
  useGetAllTempleQuery,
  useGetSingleTempleQuery,
  useAddTempleMutation,
} = templeApi;
