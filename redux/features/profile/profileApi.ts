import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
