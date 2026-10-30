/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateSubscriptionPayment: builder.mutation<any, any>({
      query: (data) => ({
        url: `/subscription/initiate-payment`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),

    getMySubscription: builder.query({
      query: () => ({
        url: `/subscription/my`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),

    markUserAsSubscribed: builder.mutation({
      query: (data) => ({
        url: `/subscription/mark-user-as-subscribed`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),

    markUserAsUnSubscribed: builder.mutation({
      query: (data) => ({
        url: `/subscription/mark-user-as-unsubscribed`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useInitiateSubscriptionPaymentMutation,
  useGetMySubscriptionQuery,
  useDeleteSubscriptionMutation,
  useMarkUserAsSubscribedMutation,
  useMarkUserAsUnSubscribedMutation,
} = subscriptionApi;
