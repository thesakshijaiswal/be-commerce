import Button from "../components/Button";
import { useSelector } from "react-redux";
import { BsCurrencyRupee } from "react-icons/bs";
const CartPage = () => {
  const { cartItems } = useSelector((state) => {
    return state.cart;
  });
  return (
    <div className="flex flex-col items-start justify-center text-black md:flex-row">
      <div className="p-4 md:w-2/3">
        <h2 className="mb-4 text-2xl font-semibold">Shopping Cart</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {cartItems.map((item) => {
            return (
              <div
                className="items-center rounded-lg bg-primary/5 p-4 lg:flex"
                key={item._id}
              >
                <div className="mr-4 h-48 w-52 object-cover">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 lg:w-1/2">
                  <h3 className="text-base font-semibold">{item.name}</h3>
                  <div className="flex items-center font-medium">
                    <BsCurrencyRupee />
                    <p className="font-medium text-gray-600">
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button className="sm: w-52 bg-red-600">Remove</Button>
                </div>
              </div>
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
