import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myOrders: builder.query({
      query: () => "/orders/my-orders",
      providesTags: [tagTypes.order],
    }),

    myOrder: builder.query({
      query: (orderId) => `/orders/my-orders/${orderId}`,
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

export const { useCreateOrderMutation, useMyOrderQuery, useMyOrdersQuery } =
  orderApi;
