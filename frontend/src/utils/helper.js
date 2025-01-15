export const updateCart = (state) => {
  // Recalculate prices after adding the item
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

  //add the updated items to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
