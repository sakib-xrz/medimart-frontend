import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // updateUserStatus: builder.mutation({
    //   query: (data) => ({
    //     url: `/user`,
    //     method: "PUT",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.user],
    // }),
  }),
});

export const {
  useGetCustomerQuery,
  // useUpdateUserStatusMutation,
} = userApi;
