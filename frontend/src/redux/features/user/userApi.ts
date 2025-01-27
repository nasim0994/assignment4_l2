import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    getAdminById: builder.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    addAdmin: builder.mutation({
      query: (adminInfo) => ({
        url: `/user/add-admin`,
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useAddAdminMutation,
} = userApi;
