/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllBooks: builder.query({
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
          url: `/book?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["book"],
    }),

    getSingleBook: builder.query({
      query: (id) => ({
        url: `/book/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["book"],
    }),

    getSingleVeda: builder.query({
      query: ({
        id,
        field1,
        field2,
        field3,
        field1Value,
        field2Value,
        field3Value,
      }) => {
        let url = `/book-text/filter?bookId=${id}`;

        if (field1 && field1Value)
          url += `&${field1}=${encodeURIComponent(field1Value)}`;
        if (field2 && field2Value)
          url += `&${field2}=${encodeURIComponent(field2Value)}`;
        if (field3 && field3Value)
          url += `&${field3}=${encodeURIComponent(field3Value)}`;

        return {
          url,
          method: 'GET',
          credentials: 'include',
        };
      },
      providesTags: ['book'],
    }),

    createBook: builder.mutation<any, any>({
      query: (data) => ({
        url: `/book/create-book`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["book"],
    }),

    deleteBook: builder.mutation<
      any,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/book/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["book"],
    }),

    updateBook: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/book/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useGetSingleVedaQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
