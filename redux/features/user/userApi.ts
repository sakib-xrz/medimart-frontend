import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: (params) => ({
        url: `/users`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApi;
