import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { ProductReview, StarRating, StockCounter, Button } from "../components";
import { ProductDetailsShimmer } from "../shimmers";
import { useGetProductDetailsQuery } from "../features/productsApiSlice";
import { addToCart } from "../features/shoppingCartSlice";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsCurrencyRupee, BsCartPlus } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const errorMessage = useMemo(() => {
    return error?.data?.message || error?.error || "Something went wrong.";
  }, [error]);

  const handleAddToCart = () => {
    if (product?.countInStock > 0) {
      dispatch(addToCart({ ...product, quantity }));
      navigate("/cart");
      toast.success("Product added to cart!");
    } else {
      toast.error(
        <span className="w-52 md:w-64">Product is out of stock!</span>,
      );
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(<span className="w-52 md:w-64">{errorMessage}</span>);
    }
  }, [error, errorMessage]);

  const handleToggleRead = () => setIsExpanded((prev) => !prev);

  if (isLoading) return <ProductDetailsShimmer />;

  if (error) {
    return (
      <section
        className="flex min-h-screen items-center justify-center"
        role="alert"
      >
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-red-600">
            Error Loading Product
          </h2>
          <p className="mb-4 text-gray-600">{errorMessage}</p>
          <Link to="/">
            <Button btnIcon={TiArrowBackOutline}>Back to Home</Button>
          </Link>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-600">
            Product Not Found
          </h2>
          <Link to="/">
            <Button btnIcon={TiArrowBackOutline}>Back to Home</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <main className="my-5 flex flex-col items-center p-4 sm:px-10 md:px-3 lg:px-16">
        <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row lg:items-start">
          <div className="relative z-10 md:left-auto md:top-auto">
            <Link to="/">
              <Button
                btnIcon={TiArrowBackOutline}
                aria-label="Go back to product list"
              >
                Back
              </Button>
            </Link>
          </div>

          <div className="flex w-full items-center justify-center lg:w-1/2">
            <figure className="w-80 rounded-lg bg-white p-2 shadow-md lg:w-96">
              <img
                className="h-full w-full rounded-md object-cover"
                src={product.image}
                alt={product.name || "Product image"}
                loading="lazy"
              />
            </figure>
          </div>

          <section
            className="flex w-full flex-col space-y-4 text-black lg:w-1/2"
            aria-labelledby="product-title"
          >
            <h1 id="product-title" className="text-lg font-semibold sm:text-xl">
              {product.name}
            </h1>

            <p className="text-base font-semibold text-primary">
              Manufactured by {product.brand}
            </p>

            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="sr-only">Rating</span>|
              <p className="font-medium text-primary">
                {product.numReviews || 0} reviews
              </p>
            </div>

            <p className="text-base">
              {isExpanded
                ? product.description
                : `${product.description?.slice(0, 200)}... `}
              <button
                onClick={handleToggleRead}
                className="font-semibold text-primary/75 focus:outline-none"
                aria-expanded={isExpanded}
                aria-controls="product-description"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </p>

            <div className="text-lg" aria-live="polite">
              {product.countInStock > 0 ? (
                <p className="text-green-600">In Stock</p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>

            <div className="flex items-center text-xl font-bold">
              <BsCurrencyRupee aria-hidden="true" />
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
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                Add to Cart{" "}
                <BsCartPlus className="text-xl" aria-hidden="true" />
              </Button>

              <Button className="w-2/4 whitespace-nowrap" aria-label="Buy now">
                Buy Now <GrMoney className="text-xl" aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
      </main>

      <ProductReview />
    </>
  );
};

export default ProductDetailsPage;
