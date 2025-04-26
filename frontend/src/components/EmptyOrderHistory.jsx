import { useNavigate } from "react-router-dom";
import Button from "./Button";
import emptyOrderSVG from "../assets/empty-order.svg";
import { FaLocationArrow } from "react-icons/fa6";

const EmptyOrderHistory = () => {
  const navigate = useNavigate();
  const handleExploreCollection = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center md:mt-32">
      <img src={emptyOrderSVG} className="h-60 md:h-96" alt="Empty cart" />
      <h3 className="text-2xl font-bold">Your order history is empty</h3>
      <p className="w-11/12 text-gray-500 md:w-full">
        It seems you haven't placed any orders yet. Start shopping now to stay
        trendy!
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

export default EmptyOrderHistory;
