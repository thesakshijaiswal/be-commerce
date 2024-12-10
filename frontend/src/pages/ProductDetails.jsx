import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((product) => product?.id === Number(id));
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRead = () => setIsExpanded((prevState) => !prevState);
  return (
    <div className="mt-28 flex min-h-screen justify-center gap-6">
      <div className="w-96">
        <img className="rounded-lg" src={product.image} alt="product-image" />
      </div>
      <div className="w-1/3 space-y-4 text-base text-black">
        <p className="font-semibold">{product.name}</p>
        <p>
          {isExpanded
            ? product.description
            : `${product.description.slice(0, 200)}... `}
          <span
            onClick={toggleRead}
            className="cursor-pointer font-semibold text-primary"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        </p>
      </div>
      <Link to="/">
        <Button className="bg-primary" btnIcon={TiArrowBackOutline}>
          Back
        </Button>
      </Link>
    </div>
  );
};

export default ProductDetails;
