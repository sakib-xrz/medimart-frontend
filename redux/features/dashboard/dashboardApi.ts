import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStatsSummery: build.query({
      query: () => ({
        url: "/dashboard/stats-summary",
        method: "GET",
      }),
    }),
    getRevenueSummary: build.query({
      query: () => ({
        url: "/dashboard/revenue-summary",
        method: "GET",
      }),
    }),
    getRecentOrders: build.query({
      query: () => ({
        url: "/dashboard/recent-orders",
        method: "GET",
      }),
    }),
    getLowStockProducts: build.query({
      query: () => ({
        url: "/dashboard/low-stock-products",
        method: "GET",
      }),
    }),
    getExpiringProducts: build.query({
      query: () => ({
        url: "/dashboard/expiring-products",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetStatsSummeryQuery,
  useGetRevenueSummaryQuery,
  useGetRecentOrdersQuery,
  useGetLowStockProductsQuery,
  useGetExpiringProductsQuery,
} = dashboardApi;
