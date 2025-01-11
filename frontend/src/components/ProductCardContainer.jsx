import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../features/productsApiSlice";
import { HomeShimmerUI } from "../shimmers";

const ProductCardContainer = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <HomeShimmerUI />
      ) : error ? (
        <div className="text-blue-700">
          {error?.data?.message || error?.error}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
          {products.map((product) => (
            <Link to={`product-details/${product?._id}`} key={product?._id}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductCardContainer;
