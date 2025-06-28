import asyncHandler from "../utils/helper.js";
import Order from "../models/order.model.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems?.length === 0) {
    res.status(400);
    throw new Error("No Order Items Found");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found!");
  }
});

const getUserOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  res.status(200).json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const pageNumber = +req.query.pageNumber || 1;
  const pageSize = process.env.PAGINATION_LIMIT || 10;

  const count = await Order.countDocuments({});
  const orders = await Order.find({})
    .populate("user", "id name")
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1))
    .sort({ createdAt: -1 });

  res.json({
    orders,
    pageNumber,
    pages: Math.ceil(count / pageSize),
  });
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id || req.body.session_id,
      status: req.body.status || "completed",
      updateTime: req.body.update_time || Date.now(),
      emailAddress: req.body.email,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

export {
  addOrderItems,
  getOrderById,
  getUserOrder,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
