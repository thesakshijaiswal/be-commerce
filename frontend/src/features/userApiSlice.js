import { apiSlice } from "./apiSlice";
import { BASE_BACKEND_URL, USERS_URL } from "../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_BACKEND_URL}${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include"
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_BACKEND_URL}${USERS_URL}/logout`,
        method: "GET",
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${BASE_BACKEND_URL}${USERS_URL}/signUp`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${BASE_BACKEND_URL}${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${BASE_BACKEND_URL}${USERS_URL}/reset-password/${data.resetToken}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = userApiSlice;
