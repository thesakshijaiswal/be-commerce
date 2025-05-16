import { useGetProductsQuery } from "../../features/productsApiSlice";
import { BsCurrencyRupee } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  if (isLoading) {
    console.log("Loading Products..");
  }
  if (error) {
    toast.error(error?.data?.message || error?.error);
  }
  return (
    <div className="w-full p-2 sm:p-4">
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  #{product._id}
                </td>
                <td className="w-3/12 px-6 py-4 text-sm text-gray-500">
                  {product.name}
                </td>
                <td className="flex items-center whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <BsCurrencyRupee />
                  <span>{product.price}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {product.brand}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <button className="pr-3 text-xl text-red-600">
                    <RiDeleteBin2Line />
                  </button>
                  <button className="text-lg text-primary">
                    <FiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
        {products?.map((product) => (
          <div
            key={product._id}
            className="space-y-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex-col items-center justify-between sm:flex sm:flex-row">
              <div className="text-sm text-secondary/60">#{product._id}</div>
              <div className="mt-3 flex items-center gap-3 sm:mt-0">
                <div className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">
                  {product.brand}
                </div>
                <div className="rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary">
                  {product.category}
                </div>
              </div>
            </div>
            <div className="text-sm text-secondary">{product.name}</div>
            <div className="flex items-center text-sm font-medium text-gray-500">
              <BsCurrencyRupee />
              <span>{product.price}</span>
            </div>
            <div className="flex items-center font-medium">
              <span>{product.totalPrice}</span>
            </div>
            <div className="flex justify-end pt-2">
              <button className="pr-3 text-xl text-red-600">
                <RiDeleteBin2Line />
              </button>
              <button className="text-lg text-primary">
                <FiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
