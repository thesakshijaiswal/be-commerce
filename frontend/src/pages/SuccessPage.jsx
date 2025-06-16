import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import paymentSuccessSVG from "../assets/payment-success.svg";
import { FaReceipt } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
const SuccessPage = () => {
  const navigate = useNavigate();
  const handleViewOrderHistory = () => {
    navigate("/profile");
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 pb-20 text-center">
      <img src={paymentSuccessSVG} className="h-96" alt="Empty cart" />
      <div className="flex items-center gap-3">
        <IoCheckmarkDoneCircle className="text-4xl text-green-500" />
        <h3 className="text-2xl font-bold text-secondary">
          Payment Successful
        </h3>
      </div>
      <p className="w-11/12 text-gray-500 md:w-full">
        Thank you for your purchase! We’re getting your order ready.
      </p>
      <Button
        className="z-20 whitespace-nowrap"
        onClick={handleViewOrderHistory}
      >
        View Order History
        <FaReceipt />
      </Button>
    </div>
  );
};

export default SuccessPage;
