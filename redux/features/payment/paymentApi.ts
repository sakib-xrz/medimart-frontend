import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (order_id) => ({
        url: `/payment/intent/${order_id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
