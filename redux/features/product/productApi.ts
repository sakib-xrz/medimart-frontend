import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query({
      query: () => ({
        url: `/products/feature`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
  }),
});

export const { useGetFeaturedProductsQuery } = productApi;
