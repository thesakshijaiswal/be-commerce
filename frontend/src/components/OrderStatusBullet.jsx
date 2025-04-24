const OrderStatusBullet = ({ isDelivered }) => {
  return (
    <p className="mt-4 flex items-center gap-3 text-gray-600">
      <span className="relative flex h-3 w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
            isDelivered ? "bg-green-400" : "bg-red-400"
          } opacity-75`}
        ></span>
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            isDelivered ? "bg-green-600" : "bg-red-600"
          }`}
        ></span>
      </span>
      {isDelivered ? "Delivered" : "Pending"}
    </p>
  );
};

export default OrderStatusBullet;
