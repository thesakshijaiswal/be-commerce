import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsCurrencyRupee, BsCartPlus } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { useState, useEffect } from "react";
import axios from "axios";
import { StarRating } from "../components";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
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
    <div className="mt-16 flex min-h-screen flex-col items-center p-4 sm:px-10 md:px-3 lg:px-16">
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
          <p className="text-base font-semibold text-primary">
            Manufactured by {product.brand}
          </p>
          <div className="flex items-center gap-2">
            <StarRating starRating={product.starRating} />|
            <p className="font-medium text-primary">{product.rating} ratings</p>
          </div>
          <p className="text-base">
            {isExpanded
              ? product.description
              : `${product.description?.slice(0, 200)}... `}
            <span
              onClick={toggleRead}
              className="cursor-pointer font-semibold text-primary/75"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          </p>
          <div className="text-lg">
            {product.countInStock > 1 ? (
              <p className="text-green-600">In Stock</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}
          </div>
          <div className="flex items-center text-xl font-bold">
            <BsCurrencyRupee />
            <h3>{product.price}</h3>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <input
              className="w-20 rounded-md bg-secondary/10 text-center"
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              max={product.countInStock}
              onChange={(e) =>
                setQuantity(
                  Math.min(product.countInStock, Math.max(1, +e.target.value)),
                )
              }
            />
            <Button
              onClick={() =>
                setQuantity((prev) => Math.min(product.countInStock, prev + 1))
              }
              disabled={quantity >= product.countInStock}
            >
              +
            </Button>
          </div>
          <div className="flex gap-4 pt-3">
            <Button className="w-52 whitespace-nowrap">
              Add to Cart <BsCartPlus className="text-xl" />
            </Button>
            <Button className="w-52 whitespace-nowrap">
              Buy Now <GrMoney className="text-xl" />
            </Button>
          </div>
        </div>
        <Link to="/">
          <Button btnIcon={TiArrowBackOutline}>Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
