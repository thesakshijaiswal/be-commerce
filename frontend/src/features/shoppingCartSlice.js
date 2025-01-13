import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.map((i) => {
        i._id === item._id;
        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) => {
            i_id === isItemExist._id ? item : i;
          });
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        state.itemsPrice = state.cartItems.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      });
    },
  },
});
console.log(shoppingCartSlice);
export default shoppingCartSlice.reducer;
