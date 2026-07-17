import { baseApi } from "../../../API/baseApi";


const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCategoriesByAreaName: builder.query({
      query: (areaName) => ({
        url: `/category/${areaName}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesByAreaNameQuery,
} = categoriesApi;
