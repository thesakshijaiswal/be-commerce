import { useParams } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="rounded-md bg-[#423a26] p-4">
      <img
        className="h-48 w-full rounded-md"
        src={product.image}
        alt={product.name}
      />
      <h2 className="mt-2 truncate text-lg">{product.name}</h2>
    </div>
  );
};

export default ProductDetails;
