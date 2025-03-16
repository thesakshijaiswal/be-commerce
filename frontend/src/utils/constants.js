export const BASE_BACKEND_URL =
  import.meta.env.NODE_ENV === "production"
    ? "https://be-commerce-q7nw.onrender.com"
    : "http://localhost:5000";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
