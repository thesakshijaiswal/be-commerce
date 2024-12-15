import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import axios from "axios";
const ProductCardContainer = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
      {products.map((product) => (
        <Link to={`product-details/${product?.id}`} key={product?.id}>
          <ProductCard {...product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductCardContainer;
