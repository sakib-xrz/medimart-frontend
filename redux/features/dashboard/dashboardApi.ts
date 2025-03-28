import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStatsSummery: build.query({
      query: () => ({
        url: "/dashboard/stats-summary",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatsSummeryQuery } = dashboardApi;
