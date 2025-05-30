import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsCurrencyRupee, BsCartPlus } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { useState } from "react";
import { ProductReview, StarRating, StockCounter } from "../components";
import { useGetProductDetailsQuery } from "../features/productsApiSlice";
import { ProductDetailsShimmer } from "../shimmers";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/shoppingCartSlice";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRead = () => setIsExpanded((prevState) => !prevState);

  const addTocartHandler = () => {
    if (product.countInStock > 0) {
      dispatch(addToCart({ ...product, quantity }));
      navigate("/cart");
      toast.success("Product added to cart!");
    } else {
      toast.error(<div className="w-52 md:w-64">Product is out of stock!</div>);
    }
  };

  if (isLoading) {
    return <ProductDetailsShimmer />;
  }

  if (error) {
    toast.error(
      <div className="w-52 md:w-64">
        {error?.data?.message || error?.error}
      </div>,
    );
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-red-600">
            Error Loading Product
          </h2>
          <p className="mb-4 text-gray-600">
            {error?.data?.message || error?.error}
          </p>
          <Link to="/">
            <Button btnIcon={TiArrowBackOutline}>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-600">
            Product Not Found
          </h2>
          <Link to="/">
            <Button btnIcon={TiArrowBackOutline}>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-5 flex flex-col items-center p-4 sm:px-10 md:px-3 lg:px-16">
        <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row lg:items-start">
          <div className="relative z-10 md:left-auto md:top-auto">
            <Link to="/">
              <Button btnIcon={TiArrowBackOutline}>Back</Button>
            </Link>
          </div>

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
              <StarRating rating={product.rating} />|
              <p className="font-medium text-primary">
                {product.numReviews || 0} reviews
              </p>
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
              {product.countInStock > 0 ? (
                <p className="text-green-600">In Stock</p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>

            <div className="flex items-center text-xl font-bold">
              <BsCurrencyRupee />
              <h3>{product.price}</h3>
            </div>

            <StockCounter
              countInStock={product.countInStock}
              initialQuantity={1}
              onQuantityChange={setQuantity}
            />

            <div className="flex gap-4 pt-3">
              <Button
                className="w-2/4 whitespace-nowrap"
                onClick={addTocartHandler}
              >
                Add to Cart <BsCartPlus className="text-xl" />
              </Button>
              <Button className="w-2/4 whitespace-nowrap">
                Buy Now <GrMoney className="text-xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductReview />
    </>
  );
};

export default ProductDetailsPage;
