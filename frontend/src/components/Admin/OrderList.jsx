import { useGetOrdersQuery } from "../../features/orderApiSlice";
import { toast } from "react-hot-toast";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  if (isLoading) {
    console.log("loading");
  }
  if (error) {
    toast.error(error.message);
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
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Delivered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  #{order._id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {order.user?.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </td>
                <td className="flex items-center whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <BsCurrencyRupee />
                  <span>{order.totalPrice}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      order.isDelivered
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <Link to={`/order/${order._id}`}>
                    <button className="rounded bg-primary px-3 py-1 text-white hover:bg-primary/90">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="space-y-2 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex-col items-center justify-between sm:flex sm:flex-row">
              <div className="text-sm text-secondary/60">#{order._id}</div>
              <div
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  order.isDelivered
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </div>
            </div>
            <div className="text-sm text-secondary">{order.user?.name}</div>
            <div className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </div>
            <div className="flex items-center font-medium">
              <BsCurrencyRupee />
              <span>{order.totalPrice}</span>
            </div>
            <div className="flex justify-end pt-2">
              <Link to={`/order/${order._id}`}>
                <button className="rounded bg-primary px-3 py-1 text-sm text-white hover:bg-primary/90">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
