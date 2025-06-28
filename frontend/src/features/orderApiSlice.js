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
    getOrders: builder.query({
      query: (params = {}) => {
        const { pageNumber = 1 } = params;
        return {
          url: ORDERS_URL,
          params: {
            pageNumber,
          },
        };
      },
      keepUnusedDataFor: 5,
    }),
    payWithStripe: builder.mutation({
      query: (order) => ({
        url: `${BASE_BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: order,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver/${orderId}`,
        method: "PATCH",
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: ({ orderId, paymentDetails }) => ({
        url: `${ORDERS_URL}/pay/${orderId}`,
        method: "PATCH",
        body: paymentDetails,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  usePayWithStripeMutation,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useUpdateOrderToPaidMutation,
} = orderApiSlice;
