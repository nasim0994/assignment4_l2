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
    }),
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `/order/my-orders/${userId}`,
        method: "GET",
      }),
    }),
    getOrderByIdQuery: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useVerifyOrderQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQueryQuery,
} = orderApi;
