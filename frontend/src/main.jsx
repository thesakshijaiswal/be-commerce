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
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import store from "./store.js";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PasswordResetPage from "./pages/PasswordResetPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
