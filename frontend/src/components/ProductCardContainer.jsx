import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../features/productsApiSlice";
import { HomeShimmerUI } from "../shimmers";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";

const ProductCardContainer = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(
        setCredentials({
          ...res.data.user._json,
          _id: res.data._id,
          isAdmin: res.data.user.isAdmin,
        }),
      );
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <HomeShimmerUI />
      ) : error ? (
        toast.error(
          <div className="w-52 md:w-64">
            {error?.data?.message || error?.error}
          </div>,
        )
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
