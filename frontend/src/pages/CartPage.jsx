import Button from "../components/Button";
import { useSelector } from "react-redux";
import { BsCurrencyRupee } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { CartItem, EmptyCart } from "../components";
const CartPage = () => {
  const { cartItems, taxPrice, shippingPrice, totalPrice } = useSelector(
    (state) => {
      return state.cart;
    },
  );
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckOut = () => {
    navigate("/checkout");
  };
  return (
    <div className="flex flex-col items-center justify-center pb-20 text-black">
      <h2 className="my-4 text-2xl font-semibold">Shopping Cart</h2>
      {totalQuantity === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col items-start justify-center gap-20 md:flex-row p-2">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => {
              return <CartItem key={item._id} {...item} />;
            })}
          </div>
          <div className="w-full rounded-md bg-secondary/5 p-4 md:mt-16 md:w-1/3">
            <h2 className="text-lg font-semibold">Subtotal</h2>
            <p className="text-gray-600">
              <span className="font-medium">Total Items: </span> {totalQuantity}
            </p>
            <p className="flex items-center text-gray-600">
              <span className="font-medium">Total tax: </span>{" "}
              <BsCurrencyRupee />
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
            <Button className="mt-5 whitespace-nowrap" onClick={handleCheckOut}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
