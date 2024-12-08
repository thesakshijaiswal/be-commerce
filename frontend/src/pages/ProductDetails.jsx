import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen flex justify-center gap-6 mt-28">
     <div className="w-96">
      <img className="rounded-lg" src= {products.find((product) => product?.id === Number(id)).image} alt="product-image" />
     </div>
      <span className="text-base text-white w-1/3 font-semibold">
        {products.find((product) => product?.id === Number(id)).name}
      </span>
      <Link to="/">
        <Button className="bg-first" btnIcon={TiArrowBackOutline}>Back</Button>
      </Link>
    </div>
  );
};

export default ProductDetails;
