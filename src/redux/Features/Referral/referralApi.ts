import { baseApi } from "../../API/baseApi";

const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReferrals: builder.query({
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
          url: `/referral/my-referrals?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["referral"],
    }),
  }),
});

export const {
  useGetMyReferralsQuery,
} = referralApi;
