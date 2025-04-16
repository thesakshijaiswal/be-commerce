import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_BACKEND_URL } from "../utils/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_BACKEND_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({}),
});
