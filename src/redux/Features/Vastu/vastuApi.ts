import { baseApi } from "../../API/baseApi";

const vastuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVastu: builder.query({
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
          url: `/vastu?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["vastu"],
    }),

    getSingleVastu: builder.query({
      query: (id) => ({
        url: `/vastu/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["vastu"],
    }),

    addVastu: builder.mutation<any, any>({
      query: (data) => ({
        url: `/vastu/add-vastu`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vastu"],
    }),

    deleteVastu: builder.mutation<any, string>({
      query: (id) => ({
        url: `/vastu/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["vastu"],
    }),

    updateVastu: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/vastu/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["vastu"],
    }),
  }),
});

export const {
  useGetAllVastuQuery,
  useGetSingleVastuQuery,
  useAddVastuMutation,
  useDeleteVastuMutation,
  useUpdateVastuMutation,
} = vastuApi;
