import {
  EmptyOrderHistory,
  OrderTimeline,
  LoadingAnimation,
} from "../components";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../features/orderApiSlice";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const { data: userOrders, isLoading, error } = useGetUserOrdersQuery();
  const navigate = useNavigate();
  const handleOrderCardClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (error) {
    return toast.error(error.message);
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="mt-8 w-full max-w-6xl p-4">
      <h3 className="mb-4 text-2xl font-semibold">Order History</h3>
      <div
        className={`space-y-4 ${
          userOrders?.length > 0 ? "md:max-h-[84vh] md:overflow-auto" : ""
        }`}
      >
        {userOrders?.length > 0 ? (
          userOrders.map((order) => (
            <div
              key={order._id}
              className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              onClick={() => handleOrderCardClick(order._id)}
              role="button"
              tabIndex={0}
            >
              <div className="mb-2 text-sm text-secondary/70">
                <div className="flex justify-between md:justify-between">
                  <span className="font-medium">Order ID: {order._id}</span>
                  <span className="hidden text-xs text-secondary md:inline">
                    Date: {order.createdAt.slice(0, 10)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-secondary/60 md:hidden">
                  Date: {order.createdAt.slice(0, 10)}
                </div>
              </div>

              <div className="space-y-3">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h4 className="line-clamp-2 text-sm font-semibold text-secondary">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-secondary">
                          Quantity: {item.quantity}
                        </span>
                        |
                        <span className="text-sm text-secondary">
                          Price: ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between text-sm font-medium">
                <span>Total: ₹{order.totalPrice}</span>
              </div>
              <div className="mt-2 rounded-lg border bg-primary/5 p-3">
                <OrderTimeline order={order} />
              </div>
            </div>
          ))
        ) : (
          <EmptyOrderHistory />
        )}
      </div>
      <div className="pointer-events-none sticky bottom-0 -mt-16 flex h-16 bg-gray-100 [mask-image:linear-gradient(transparent,#000000)]"></div>
    </div>
  );
};

export default OrderHistory;
