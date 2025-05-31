import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../features/productsApiSlice";
import { HomeShimmerUI } from "../shimmers";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/userSlice";

const ProductCardContainer = () => {
  const { keyword } = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery(keyword);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_BACKEND_URL}/auth/login/success`, {
          withCredentials: true,
        });
        if (res.data.user) {
          console.log("User authenticated:", res.data.user);
          dispatch(
            setCredentials({
              ...res.data.user._json,
              _id: res.data._id,
              isAdmin: res.data.user.isAdmin,
            }),
          );
        } else {
          console.log("User not authenticated");
        }
      } catch (error) {
        if (error.response?.status === 403 || error.response?.status === 401) {
          console.log(
            "User is not logged in. This is expected for unauthenticated users.",
          );
        } else {
          console.error("Unexpected error fetching user:", error);
        }
      }
    };
    if (!user.userInfo) {
      console.log("Attempting to fetch user info...");
      getUser();
    } else {
      console.log("User already logged in:", user.userInfo);
    }
  }, [user.userInfo, dispatch]);

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
            <Link to={`/product-details/${product?._id}`} key={product?._id}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductCardContainer;
