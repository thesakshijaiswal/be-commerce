import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsCurrencyRupee } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRead = () => setIsExpanded((prevState) => !prevState);

  return (
    <div className="mt-16 flex min-h-screen flex-col items-center px-4 sm:px-10 md:px-3 lg:px-16">
      <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row lg:items-start">
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="w-80 rounded-lg bg-white p-2 shadow-md lg:w-96">
            <img
              className="h-full w-full rounded-md object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>
        <div className="flex w-full flex-col space-y-4 text-black lg:w-1/2">
          <h1 className="text-lg font-semibold sm:text-xl">{product.name}</h1>
          <p className="text-base">
            {isExpanded
              ? product.description
              : `${product.description?.slice(0, 200)}... `}
            <span
              onClick={toggleRead}
              className="cursor-pointer font-semibold text-primary"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          </p>
          <div className="flex items-center text-xl font-bold">
            <BsCurrencyRupee />
            <h3>{product.price}</h3>
          </div>
        </div>
        <Link to="/">
          <Button className="bg-primary" btnIcon={TiArrowBackOutline}>
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
