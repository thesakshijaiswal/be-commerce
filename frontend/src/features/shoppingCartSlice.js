import { createSlice } from "@reduxjs/toolkit";

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
    },
  },
});

export const { addToCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
