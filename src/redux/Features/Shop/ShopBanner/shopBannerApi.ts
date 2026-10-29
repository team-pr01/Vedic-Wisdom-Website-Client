/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../../API/baseApi";

const shopBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShopBanners: builder.query<any, void>({
      query: () => ({
        url: `/shop-banner`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["shopBanner"],
    }),

    getSingleBanner: builder.query<any, string>({
      query: (id) => ({
        url: `/shop-banner/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["shopBanner"],
    }),

    addBanner: builder.mutation<any, any>({
      query: (data) => ({
        url: `/shop-banner/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["shopBanner"],
    }),

    deleteBanner: builder.mutation<any, string>({
      query: (id) => ({
        url: `/shop-banner/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["shopBanner"],
    }),
  }),
});

export const {
  useGetAllShopBannersQuery,
  useGetSingleBannerQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
} = shopBannerApi;