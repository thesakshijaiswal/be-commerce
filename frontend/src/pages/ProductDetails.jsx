import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";
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
    <div className="mt-28 flex min-h-screen justify-center gap-6">
      <div className="w-96">
        <img className="rounded-lg" src={product.image} alt="product-image" />
      </div>
      <div className="w-1/3 space-y-4 text-base text-black">
        <p className="font-semibold">{product.name}</p>
        <p>
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
