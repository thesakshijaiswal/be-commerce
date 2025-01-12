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
      const existingCartItem = state.cartItems.map((i) => {
        i._id === item._id;
        if (existingCartItem) {
          state.cartItems = state.cartItems.map((i) => {
            i_id === existingCartItem._id ? item : i;
          });
        } else {
          state.cartItems = [...state.cartItems, item];
        }
      });
    },
  },
});
console.log(shoppingCartSlice);
export default shoppingCartSlice.reducer;
