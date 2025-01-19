import Button from "../components/Button";
import { useSelector } from "react-redux";
const CartPage = () => {
  const { cartItems } = useSelector((state) => {
    return state.cart;
  });
  return (
    <div className="flex flex-col items-start justify-center text-black md:flex-row">
      <div className="p-4 md:w-2/3">
        <h2 className="mb-4 text-2xl font-semibold">Shopping Cart</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cartItems.map((item) => {
            return (
              <div
                className="flex items-center border border-gray-300 p-4"
                key={item._id}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="bg-gray-100 p-4 md:w-1/3">
        <h2 className="text-lg font-semibold">Subtotal</h2>
        <p className="text-gray-600">Total Items: </p>
        <p className="text-gray-600">Total Price: </p>
        <Button className="mt-5">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
