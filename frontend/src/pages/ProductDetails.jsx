import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div>
      Product Name:
      <span className="text-sm text-gray-500">
        {products.find((product) => product?.id === Number(id)).name}
      </span>
      <Link to="/">
        <Button btnIcon={TiArrowBackOutline}>Back</Button>
      </Link>
    </div>
  );
};

export default ProductDetails;
