/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
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
          url: `/product?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["food"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),

    //For vendor to fetch their products
    getMyProducts: builder.query({
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
          url: `/product/my-products?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["food"],
    }),

    addProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    incrementClick: builder.mutation<any, any>({
      query: (id) => ({
        url: `/product/click/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetMyProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useIncrementClickMutation,
  useDeleteProductMutation,
} = productApi;
