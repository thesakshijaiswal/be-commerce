import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import {
  HomePage,
  ProductDetailsPage,
  CartPage,
  LoginPage,
  SignUpPage,
  ShippingPage,
  PasswordResetPage,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<ShippingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route
        path="/reset-password/:resetToken"
        element={<PasswordResetPage />}
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
