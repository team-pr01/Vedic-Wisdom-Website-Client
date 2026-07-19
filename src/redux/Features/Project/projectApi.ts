import { baseApi } from "../../API/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
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
          url: `/project?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["project"],
    }),

    getSingleProjectById: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetSingleProjectByIdQuery,
} = projectApi;
