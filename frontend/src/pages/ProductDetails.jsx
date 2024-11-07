import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({product}) => {
  const { id } = useParams();
  console.log(id);
  return (
  <div className="bg-[#423a26] p-4 rounded-md">
    <img className="w-full h-48 rounded-md" src={product.image} alt={product.name} />
    <h2 className="text-lg truncate mt-2">{product.name}</h2>
  </div>
);
};

export default ProductDetails;
