import { useParams } from "react-router-dom";
import { Button, OrderStatusBullet } from "../components";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayWithStripeMutation,
} from "../features/orderApiSlice";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payWithStripe, { isLoading: loadingStripe }] =
    usePayWithStripeMutation();

  const [deliverOrder, { isLoading: loadingDeliveryStatus }] =
    useDeliverOrderMutation();

  if (error) {
    toast.error(error?.data?.message || "Failed to load order details");
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    shippingAddress,
    user,
    isDelivered,
    orderItems,
    totalPrice,
    shippingPrice,
    taxPrice,
    paymentMethod,
  } = order || {};

  console.log(order);

  const handleStripePayment = async () => {
    try {
      const res = await payWithStripe({
        orderId,
        orderItems,
        totalPrice,
        shippingPrice,
        taxPrice,
        paymentMethod,
        paymentResult,
      }).unwrap();
      window.location.href = res.url;
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleOrderDelivery = async (orderId) => {
    await deliverOrder(orderId);
    refetch();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-secondary">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Order Details
        </h1>
        <span className="text-secondary/50">Order number</span>{" "}
        <span className="font-medium text-secondary">{orderId}</span>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="min-h-[200px] rounded-lg bg-primary/5 p-6 capitalize shadow-md">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <p className="mt-4 text-base text-gray-600">{user?.name}</p>
          <p className="text-base text-gray-600">
            {shippingAddress?.address}, {shippingAddress?.city},{" "}
            {shippingAddress?.country}
          </p>
          <p className="text-base text-gray-600">
            Postal Code: {shippingAddress?.postalCode}
          </p>
        </div>
        <div className="min-h-[200px] rounded-lg bg-primary/5 p-6 capitalize shadow-md">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <p className="mt-4 text-base text-gray-600">{order?.paymentMethod}</p>
          <p className="text-base text-gray-600">**** **** **** ****</p>
        </div>
        <div className="min-h-[200px] rounded-lg bg-primary/5 p-6 capitalize shadow-md">
          <h3 className="text-lg font-semibold">Order Status</h3>
          <OrderStatusBullet
            isDelivered={isDelivered}
            className="text-base text-gray-600"
          />
        </div>
      </div>

      <div className="mt-8 w-full max-w-6xl rounded-lg bg-secondary/5 p-4 shadow-md">
        <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
        <table className="w-full table-auto text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b">
              <th className="px-1 py-2 sm:px-3">Product</th>
              <th className="px-1 py-2 text-center sm:px-3">Qty</th>
              <th className="px-1 py-2 text-right sm:px-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems?.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="flex max-w-36 items-center gap-4 truncate py-2 sm:max-w-56 md:max-w-96 lg:max-w-2xl">
                  <img
                    src={item.image}
                    alt={item.name || "Product Image"}
                    className="block h-16 w-16 rounded-lg"
                  />
                  <span className="truncate">{item.name}</span>
                </td>
                <td className="px-1 py-2 text-center sm:px-3">
                  {item.quantity}
                </td>
                <td className="py-2 text-right">
                  <span className="flex items-center justify-end">
                    <BsCurrencyRupee className="mr-1" />
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between text-sm sm:text-base">
          <span>Shipping Charge:</span>
          {orderItems && (
            <span className="flex items-center">
              <BsCurrencyRupee className="mr-1" />
              {shippingPrice}
            </span>
          )}
        </div>
        <div className="mt-4 flex justify-between text-sm sm:text-base">
          <span>Total Tax:</span>
          {orderItems && (
            <span className="flex items-center">
              <BsCurrencyRupee className="mr-1" />
              {taxPrice}
            </span>
          )}
        </div>
        <div className="mt-4 flex justify-between text-sm font-semibold sm:text-base">
          <span>Total:</span>
          {orderItems && (
            <span className="flex items-center">
              <BsCurrencyRupee className="mr-1" />
              {totalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center md:flex-row md:gap-4">
          {order?.paymentResult?.status !== "completed" && (
            <Button className="mt-4 w-full" onClick={handleStripePayment}>
              Pay Now
            </Button>
          )}
          {userInfo.isAdmin && !order.isDelivered && (
            <Button
              className="mt-4 w-full"
              onClick={() => handleOrderDelivery(orderId)}
            >
              Mark As Delivered
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
