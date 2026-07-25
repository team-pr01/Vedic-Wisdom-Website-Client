/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const coinTransactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initiatePayment: builder.mutation<any, any>({
            query: (data) => ({
                url: `/coin-transaction/initiate`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["coinTransaction"],
        }),
    }),
});

export const {
    useInitiatePaymentMutation
} = coinTransactionApi;