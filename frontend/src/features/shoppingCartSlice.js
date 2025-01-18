import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/helper";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
    };

const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; //this contains the item that we want to add to cart
      const isItemExist = state.cartItems.find(
        (cartItem) => cartItem._id === newItem._id,
      );

      //if item exist then spread the cartItems and update quantity else push new item
      if (isItemExist) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === isItemExist._id
            ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity }
            : cartItem,
        );
      } else {
        state.cartItems.push(newItem);
      }
      return updateCart(state);
    },
  },
});

export const { addToCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
