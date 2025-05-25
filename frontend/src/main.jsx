import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
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
  PaymentPage,
  OrderSummaryPage,
  OrderDetailsPage,
  ProfilePage,
  SuccessPage,
  AdminDashboardPage,
  ProductEditPage,
  UserEditPage,
} from "./pages";
import {
  AdminRoutes,
  SecuredRoutes,
  UserList,
  ProductList,
  OrderList,
} from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/reset-password/:resetToken"
        element={<PasswordResetPage />}
      />
      {/* Authorized user Routes */}
      <Route path="" element={<SecuredRoutes />}>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/checkout" element={<ShippingPage />} />
        <Route path="/place-order" element={<OrderSummaryPage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Route>
      {/* Admin Routes */}
      <Route path="/" element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminDashboardPage />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UserList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
      </Route>
      {/* Standalone Admin Pages */}
      <Route path="/" element={<AdminRoutes />}>
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/users/:id/edit" element={<UserEditPage />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
