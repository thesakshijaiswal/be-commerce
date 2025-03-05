import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../features/productsApiSlice";
import { HomeShimmerUI } from "../shimmers";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/userSlice";

const ProductCardContainer = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true,
      });
      if (res.data.user) {
        dispatch(
          setCredentials({
            ...res.data.user._json,
            _id: res.data._id,
            isAdmin: res.data.user.isAdmin,
          })
        );
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      if (error.response?.status !== 403) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    if (!user || !user._id) {
      getUser();
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <HomeShimmerUI />
      ) : error ? (
        toast.error(
          <div className="w-52 md:w-64">
            {error?.data?.message || error?.error}
          </div>
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