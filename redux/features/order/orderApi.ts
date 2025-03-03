import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myOrders: builder.query({
      query: () => "/orders/me",
      providesTags: [tagTypes.order],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const { useCreateOrderMutation, useMyOrdersQuery } = orderApi;
