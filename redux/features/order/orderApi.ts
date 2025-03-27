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

    getAllOrders: builder.query({
      query: (params) => ({
        url: `/orders/admin`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.order],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useMyOrderQuery,
  useMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
