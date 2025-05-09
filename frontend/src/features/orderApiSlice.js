import { apiSlice } from "./apiSlice";
import { BASE_BACKEND_URL, ORDERS_URL } from "../utils/constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
      keepUnusedDataFor: 5,
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user-orders`,
      }),
      keepUnusedDataFor: 5,
    }),
    payWithStripe: builder.mutation({
      query: (orderItems) => ({
        url: `${BASE_BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: orderItems,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  usePayWithStripeMutation
} = orderApiSlice;
