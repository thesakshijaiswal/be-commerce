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
import Pagination from "./Pagination";
import EmptySearch from "./EmptySearch";

const ProductCardContainer = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BASE_BACKEND_URL}/auth/login/success`, {
          withCredentials: true,
        });
        if (res.data.user) {
          dispatch(setCredentials(res.data.user));
        }
      } catch (error) {
        const status = error.response?.status;
        if (status !== 401 && status !== 403) {
          if (import.meta.env.DEV) {
            console.error("Unexpected error fetching user:", error);
          }
        }
      }
    };
    if (!user.userInfo) {
      getUser();
    }
  }, [user.userInfo, dispatch]);

  if (isLoading) {
    return <HomeShimmerUI />;
  }

  if (error) {
    toast.error(
      <div className="w-52 md:w-64">
        {error?.data?.message || error?.error}
      </div>,
    );
    return null;
  }

  if (!data?.products?.length) {
    return <EmptySearch searchTerm={keyword} />;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
        {data?.products?.map((product) => (
          <Link to={`/product-details/${product?._id}`} key={product?._id}>
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
      <div className="mt-12 flex items-center justify-center">
        <Pagination
          pages={data.pages}
          pageNum={data.pageNumber}
          keyword={keyword ? keyword : ""}
        />
      </div>
    </>
  );
};

export default ProductCardContainer;
