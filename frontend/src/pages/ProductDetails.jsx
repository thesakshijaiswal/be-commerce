import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className="mt-28 flex min-h-screen justify-center gap-6">
      <div className="w-96">
        <img
          className="rounded-lg"
          src={products.find((product) => product?.id === Number(id)).image}
          alt="product-image"
        />
      </div>
      <span className="w-1/3 text-base font-semibold text-white">
        {products.find((product) => product?.id === Number(id)).name}
      </span>
      <Link to="/">
        <Button className="bg-primary" btnIcon={TiArrowBackOutline}>
          Back
        </Button>
      </Link>
    </div>
  );
};

export default ProductDetails;
