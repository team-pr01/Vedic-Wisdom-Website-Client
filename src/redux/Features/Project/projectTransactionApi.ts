/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const projectTransactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initiateProjectPayment: builder.mutation<any, any>({
            query: (data) => ({
                url: `/project-transaction/initiate`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["coinTransaction"],
        }),
    }),
});

export const {
    useInitiateProjectPaymentMutation
} = projectTransactionApi;