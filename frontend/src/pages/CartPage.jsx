import Button from "../components/Button";
import { useSelector } from "react-redux";
import { BsCurrencyRupee } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EmptyCartSVG from "../assets/cart.svg";
import { FaLocationArrow } from "react-icons/fa6";
const CartPage = () => {
  const { cartItems, taxPrice, shippingPrice, totalPrice } = useSelector(
    (state) => {
      return state.cart;
    },
  );
  const navigate = useNavigate();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const handleRemoveItem = () => {};
  const handleCheckOut = () => {
    navigate("/checkout");
  };
  const handleExploreCollection = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center text-black">
      {totalQuantity === 0 ? (
        <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
          <div className="absolute h-full w-1/2 rounded-full bg-primary/5 blur-2xl"></div>
          <img
            src={EmptyCartSVG}
            className="z-50 h-56 md:h-80"
            alt="Empty cart"
          />
          <h3 className="z-50 text-2xl font-bold">Your cart is empty</h3>
          <p className="z-50 text-gray-500">
            Looks like you have not added anything to your cart. Go ahead &
            explore top categories.
          </p>
          <Button
            className="z-50 whitespace-nowrap"
            onClick={handleExploreCollection}
          >
            Explore our Collection
            <FaLocationArrow />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-center md:flex-row">
          <div className="p-4 md:w-2/3">
            <h2 className="mb-4 text-2xl font-semibold">Shopping Cart</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {cartItems.map((item, index) => {
                return (
                  <div
                    className="items-center space-y-4 rounded-lg bg-primary/5 p-4 lg:flex"
                    key={item._id || index}
                  >
                    <div className="mr-4 h-48 w-52 object-cover">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-2 lg:w-1/2">
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <div className="flex items-center font-medium">
                        <BsCurrencyRupee />
                        <p className="font-medium text-tertiary">
                          {item.price.toFixed(2)}
                        </p>{" "}
                        <span className="mx-1 h-5 w-0.5 bg-gray-600"></span>
                        <p className="whitespace-nowrap text-tertiary">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <Button
                        className="sm:w-52 md:w-36"
                        onClick={handleRemoveItem}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
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
            <Button className="mt-5" onClick={handleCheckOut}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
