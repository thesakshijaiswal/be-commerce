import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  const colors = Array.from({ length: 20 }).map((_, i) =>
    i % 2 === 0 ? "bg-secondary" : "bg-gray-300",
  );
  return (
    <div className="flex min-h-screen items-center justify-center gap-2 text-center text-secondary">
      <div className="flex flex-col justify-center">
        <IoCartOutline className="-mb-4 animate-bounce text-5xl" />
        <div className="relative mt-2 h-0.5 w-40 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 flex w-[800%]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 4,
            }}
          >
            {[...colors, ...colors].map((color, i) => (
              <span key={i} className={`h-0.5 w-9 ${color} `} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <span className="absolute right-8 font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
