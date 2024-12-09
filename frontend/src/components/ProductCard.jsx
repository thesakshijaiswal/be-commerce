import { IoIosStar } from "react-icons/io";
import { BsCurrencyRupee, BsCartPlus } from "react-icons/bs";
import { Button } from "../components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ProductCard = ({
  image,
  name,
  starRating,
  rating,
  price,
  countInStock,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"],
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPerct = mouseX / width - 0.5;
    const yPerct = mouseY / height - 0.5;

    x.set(xPerct);
    y.set(yPerct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-secondary/20 h-96 w-80 rounded-xl p-2 duration-300 hover:scale-105"
    >
      <div
        className="h-[370px] w-[305px] space-y-3 rounded-lg bg-white p-3"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="h-56 w-full overflow-hidden rounded-md">
          <img className="h-full w-full" src={image} alt={name} />
        </div>
        <h2 className="mt-3 truncate text-lg font-semibold leading-tight">
          {name}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IoIosStar className="absolute left-4 text-primary" />
            <div className="w-1/5 rounded-md bg-white/30 px-7 py-1">
              {starRating}
            </div>
            <span>, ({rating})</span>
          </div>
          <div className="flex items-center font-medium">
            <BsCurrencyRupee />
            <div>{price}</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {countInStock > 1 ? (
            <Button className="bg-[#78fc0d46] text-[#79fc0d]">Available</Button>
          ) : (
            <Button className="bg-[#ff4c4c46] text-[#ff4c4c]">
              Unavailable
            </Button>
          )}
          <Button className="flex items-center gap-2 bg-[#585555a8] font-medium">
            Add To Cart <BsCartPlus className="text-xl" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
