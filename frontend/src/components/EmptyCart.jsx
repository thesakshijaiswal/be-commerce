import { useNavigate } from "react-router-dom";
import Button from "./Button";
import emptyCartSVG from "../assets/empty-cart.svg";
import { FaLocationArrow } from "react-icons/fa6";

const EmptyCart = () => {
  const navigate = useNavigate();
  const handleExploreCollection = () => {
    navigate("/");
  };
  return (
    <div className="-mt-14 flex h-screen flex-col items-center justify-center space-y-6 text-center">
      <img src={emptyCartSVG} className="h-60 md:h-96" alt="Empty cart" />
      <h3 className="text-2xl font-bold">Your cart is empty</h3>
      <p className="w-11/12 text-gray-500 md:w-full">
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
