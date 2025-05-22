export const updateCart = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.taxPrice = Number(state.itemsPrice * 0.15).toFixed(2);
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};

export const truncateProductName = (name, maxLength) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + "...";
  }
  return name;
};

export const getImageSource = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  if (imagePath.startsWith("/uploads")) {
    return `${BASE_BACKEND_URL}${imagePath}`;
  }
  return imagePath;
};
