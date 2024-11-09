import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "./ProductCard";
const ProductCardContainer = () => {
  return (
    <div>
      {products.map((product) => (
        <Link to={`product-details/${product?.id}`} key={product?.id}>
          <ProductCard {...product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductCardContainer;
