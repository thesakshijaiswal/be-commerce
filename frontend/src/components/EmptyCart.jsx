import { useNavigate } from "react-router-dom";
import Button from "./Button";
import emptyCartSVG from "../assets/cart.svg";
import { FaLocationArrow } from "react-icons/fa6";

const EmptyCart = () => {
  const navigate = useNavigate();
  const handleExploreCollection = () => {
    navigate("/");
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
      <div className="absolute h-full w-1/2 rounded-full bg-primary/5 blur-2xl"></div>
      <img src={emptyCartSVG} className="h-56 md:h-80" alt="Empty cart" />
      <h3 className="text-2xl font-bold">Your cart is empty</h3>
      <p className="text-gray-500">
        Looks like you have not added anything to your cart. Go ahead & explore
        top categories.
      </p>
      <Button
        className="z-20 whitespace-nowrap"
        onClick={handleExploreCollection}
      >
        Explore our Collection
        <FaLocationArrow />
      </Button>
    </div>
  );
};

export default EmptyCart;
