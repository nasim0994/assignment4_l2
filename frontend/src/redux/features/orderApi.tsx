import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: `/order/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: `/order/verify/${order_id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `/order/my-orders/${userId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getAllOrders: builder.query({
      query: (query) => ({
        url: `/order/all`,
        method: "GET",
        params: query,
      }),
      providesTags: ["order"],
    }),
    getOrderByIdQuery: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    statusUpdate: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/update/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useVerifyOrderQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQueryQuery,
  useStatusUpdateMutation,
  useDeleteOrderMutation,
} = orderApi;
