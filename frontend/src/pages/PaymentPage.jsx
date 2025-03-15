import { useSelector } from "react-redux";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaStripe, FaRegCreditCard } from "react-icons/fa6";
import "../index.css";
import { Button } from "../components";

const PaymentPage = () => {
  const { cartItems, taxPrice, shippingPrice, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-3 sm:px-7 md:px-2">
      <h1 className="mb-6 ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Choose Your Payment Option
      </h1>
      <div className="flex h-full w-full flex-col items-center justify-center gap-10 md:flex-row">
        <form action="#" className="flex h-96 w-full flex-col gap-10 lg:w-2/5">
          <div className="flex h-1/2 w-full items-center justify-around gap-2 rounded-md bg-secondary/5 shadow-md">
            <div>
              <label className="custom-radio">
                <input type="radio" name="payment" defaultChecked />
                <span className="checkmark"></span>
              </label>
              <label className="text-base font-semibold text-secondary md:text-lg">
                Pay with Stripe
              </label>
            </div>
            <span className="text-violet-500">
              <FaStripe className="text-7xl" />
            </span>
          </div>
          <div className="flex h-1/2 w-full items-center justify-around gap-2 rounded-md bg-secondary/5 shadow-md">
            <div>
              <label className="custom-radio">
                <input type="radio" name="payment" />
                <span className="checkmark"></span>
              </label>
              <label className="text-base font-semibold text-secondary md:text-lg">
                Pay with Credit Card
              </label>
            </div>
            <span className="text-yellow-400">
              <FaRegCreditCard className="text-5xl" />
            </span>
          </div>
        </form>
        <div className="flex h-56 w-full flex-col justify-center rounded-md bg-primary/5 pl-12 shadow-md lg:w-2/5">
          <h2 className="text-lg font-semibold text-secondary">Subtotal</h2>
          <p className="text-gray-600">
            <span className="font-medium">Total Items: </span> {totalQuantity}
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium">Total tax: </span> <BsCurrencyRupee />
            {taxPrice}
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium">Shipping charges: </span>
            <BsCurrencyRupee />
            {shippingPrice}
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium">Total Price: </span>{" "}
            <BsCurrencyRupee />
            {totalPrice}
          </p>
          <Button className="mt-4 w-3/4 lg:w-1/2">Pay Now</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
