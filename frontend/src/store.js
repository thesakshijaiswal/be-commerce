import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import cartReducer from "./features/shoppingCartSlice";
import useReducer from "./features/userSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    user: useReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
