import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { useCreateOrderMutation } from "../features/orderApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BsCurrencyRupee } from "react-icons/bs";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const {
    cartItems,
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const { userInfo } = useSelector((state) => state.user);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const response = await createOrder({
        orderItems: cartItems,
        shippingAddress: address,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();

      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-secondary">
      <h1 className="mb-6 ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Place Your Order
      </h1>
      <div className="w-full max-w-6xl rounded-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-6">
            <div className="h-40 rounded-lg bg-primary/5 p-4 capitalize shadow-md">
              <h3 className="text-lg font-semibold">Shipping Address</h3>
              <p className="mt-4 text-base text-gray-600">{userInfo?.name}</p>
              <p className="text-base text-gray-600">
                {address}, {city}, {country}
              </p>
              <p className="text-base text-gray-600">
                Postal Code: {postalCode}
              </p>
            </div>
            <div className="rounded-lg bg-primary/5 p-4 shadow-md">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <p className="text-base text-gray-600">{paymentMethod}</p>
              <p className="text-base text-gray-600">**** **** **** ****</p>
            </div>
          </div>
          <div className="rounded-lg bg-secondary/5 p-4 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <table className="w-full text-left text-base">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Product</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="flex max-w-32 items-center gap-4 truncate py-2 lg:max-w-60">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="hidden lg:block lg:h-16 lg:w-16 lg:rounded-lg"
                      />
                      <span className="truncate">{item.name}</span>
                    </td>
                    <td className="py-2 text-center">{item.quantity}</td>
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
            <div className="mt-4 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="flex items-center">
                <BsCurrencyRupee className="mr-1" />
                {totalPrice}
              </span>
            </div>
            <Button className="mt-4 w-full" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
