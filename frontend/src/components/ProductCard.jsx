import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
const ProductCard = ({ image, name }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["18.5deg", "-18.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"],
  );
  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.right;
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
      className="h-96 w-80 rounded-xl bg-[#afafb177] p-4 duration-300 hover:scale-105"
    >
      <div
        className="h-[350px] w-72 rounded-lg bg-[#252527] p-3"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="h-56 w-full overflow-hidden rounded-md">
          <img className="h-full w-full" src={image} alt={name} />
        </div>
        <h2 className="mt-3 truncate text-lg font-semibold leading-tight text-white">
          {name}
        </h2>
      </div>
    </motion.div>
  );
};

export default ProductCard;
