// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { baseApi } from "@/redux/api/baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCartItems: build.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCartItems", undefined, (draft) => {
            draft.data = payload.cart_items;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetCartItemsMutation } = cartApi;
