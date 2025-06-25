import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaClipboardCheck,
  FaMoneyCheckAlt,
  FaTruck,
  FaBoxOpen,
} from "react-icons/fa";

const stages = [
  {
    label: "Added to Cart",
    icon: FaShoppingCart,
  },
  {
    label: "Order Placed",
    icon: FaClipboardCheck,
  },
  {
    label: "Payment Received",
    icon: FaMoneyCheckAlt,
  },
  {
    label: "Out for Delivery",
    icon: FaTruck,
  },
  {
    label: "Delivered",
    icon: FaBoxOpen,
  },
];

const OrderTimeline = ({ order }) => {
  const getCurrentStep = () => {
    if (order.isDelivered) return 4;
    if (order.paidAt) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="mx-auto w-full max-w-4xl p-2">
      <div className="hidden lg:block">
        <div className="relative">
          <div className="absolute left-[5%] right-[5%] top-5 h-1 rounded-full bg-gray-200">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${(currentStep / (stages.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="relative flex justify-between">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx <= currentStep;

              return (
                <motion.div
                  key={idx}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <motion.div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-transparent bg-primary text-white shadow-lg"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>

                  <div className="mt-2 max-w-20 text-center sm:max-w-none">
                    <span
                      className={`text-xs font-medium transition-colors duration-300 ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-0.5 rounded-full bg-gray-200">
            <motion.div
              className="w-full rounded-full bg-gradient-to-b from-blue-500 to-emerald-500"
              initial={{ height: 0 }}
              animate={{
                height: `${(currentStep / (stages.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-8">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx <= currentStep;

              return (
                <motion.div
                  key={idx}
                  className="relative flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <motion.div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-transparent bg-primary text-white shadow-lg"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>

                  <div className="min-w-0 flex-1 pb-2">
                    <motion.h3
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                      animate={{ opacity: isActive ? 1 : 0.7 }}
                    >
                      {stage.label}
                    </motion.h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
