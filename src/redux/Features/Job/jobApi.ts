import { baseApi } from "../../API/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlJobs: builder.query({
      query: ({
        keyword,
        limit,
        page,
        skip,
        category,
        country,
        state,
        city,
        jobType,
        workMode,
        experienceLevel,
        minSalary,
        maxSalary,
      }: {
        keyword?: string;
        limit?: number;
        page?: number;
        skip?: number;
        category?: string[];
        country?: string;
        state?: string;
        city?: string;
        jobType?: string;
        workMode?: string;
        experienceLevel?: string[];
        minSalary?: string;
        maxSalary?: string;
      } = {}) => {
        const params = new URLSearchParams();

        // Helper function to check if value is "All"
        const isAll = (value: string) => value === "All" || value === "all";

        // Handle keyword - skip if "All" or empty
        if (keyword && !isAll(keyword) && keyword.trim() !== "") {
          params.append("keyword", keyword.trim());
        }

        // Pagination
        if (typeof limit === "number" && limit > 0) {
          params.append("limit", limit.toString());
        }
        if (typeof page === "number" && page > 0) {
          params.append("page", page.toString());
        }
        if (typeof skip === "number" && skip > 0) {
          params.append("skip", skip.toString());
        }

        // Category - handle array
        if (category && Array.isArray(category) && category.length > 0) {
          // Filter out "All" from categories
          const filteredCategories = category.filter((cat) => !isAll(cat));
          if (filteredCategories.length > 0) {
            params.append("category", filteredCategories.join(","));
          }
        }

        // Location filters - if "All" then don't add to params
        if (country && !isAll(country) && country.trim() !== "") {
          params.append("country", country.trim());
        }
        if (state && !isAll(state) && state.trim() !== "") {
          params.append("state", state.trim());
        }
        if (city && !isAll(city) && city.trim() !== "") {
          params.append("city", city.trim());
        }

        // Job Type - if "All" then don't add to params
        if (jobType && !isAll(jobType) && jobType.trim() !== "") {
          params.append("jobType", jobType.trim());
        }

        // workMode - if "All" then don't add to params
        if (workMode && !isAll(workMode) && workMode.trim() !== "") {
          params.append("workMode", workMode.trim());
        }

        // Experience Level - handle array
        if (experienceLevel && Array.isArray(experienceLevel) && experienceLevel.length > 0) {
          // Filter out "All" from experience levels
          const filteredExperience = experienceLevel.filter((exp) => !isAll(exp));
          if (filteredExperience.length > 0) {
            params.append("experienceLevel", filteredExperience.join(","));
          }
        }

        // Salary Range
        if (minSalary && minSalary.trim() !== "") {
          params.append("minSalary", minSalary.trim());
        }
        if (maxSalary && maxSalary.trim() !== "") {
          params.append("maxSalary", maxSalary.trim());
        }

        const queryString = params.toString();
        return {
          url: `/job${queryString ? `?${queryString}` : ""}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["job"],
    }),

    getSingleJobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["job"],
    }),
  }),
});

export const {
  useGetAlJobsQuery,
  useGetSingleJobByIdQuery,
} = jobApi;
