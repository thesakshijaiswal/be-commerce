import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../features/productsApiSlice";
import { BsCurrencyRupee } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Button, Pagination } from "../../components";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDeleteProduct }] =
    useDeleteProductMutation();

  const { userInfo } = useSelector((state) => state.user);

  if (isLoading)
    return <div className="text-center text-secondary">Loading...</div>;
  if (error) {
    toast.error(error?.data?.message || error?.error);
  }

  const handleCreateProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        toast.success("Product Created");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(id).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="mb-3 flex flex-wrap justify-between gap-4">
        <h2 className="text-2xl font-bold text-secondary">Manage Inventory</h2>
        <Button onClick={handleCreateProduct}>Create Product</Button>
      </div>
      <div className="hidden overflow-x-auto rounded-lg bg-white shadow md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                In Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  #{product._id}
                </td>
                <td className="w-3/12 px-6 py-4 text-sm text-gray-500">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <BsCurrencyRupee />
                    <span>{product.price}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {product.brand}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                  {product.countInStock}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <button
                    className="pr-2 text-lg text-primary"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-xl text-red-600"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
        {data?.products?.map((product) => (
          <div
            key={product._id}
            className="space-y-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex-col items-center justify-between sm:flex sm:flex-row">
              <div className="text-sm text-secondary/60">#{product._id}</div>
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-0">
                <div className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                  {product.brand}
                </div>
                <div className="rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary">
                  {product.category}
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-sm ${product.countInStock ? "bg-green-200 text-green-700" : "bg-red-200 text-red-600"}`}
                >
                  {product.countInStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>
            </div>
            <div className="text-sm text-secondary">{product.name}</div>
            <div className="flex items-center text-sm text-gray-500">
              Quantity : {product.countInStock}
            </div>
            <div className="flex items-center text-sm font-medium text-gray-500">
              <BsCurrencyRupee />
              <span>{product.price}</span>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-lg text-primary">
                <FiEdit onClick={() => handleEditProduct(product._id)} />
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="pr-3 text-xl text-red-600"
              >
                <RiDeleteBin2Line />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center">
        <Pagination
          pages={data?.pages}
          pageNum={data?.pageNumber}
          isAdmin={userInfo.isAdmin}
        />
      </div>
    </div>
  );
};

export default ProductList;
