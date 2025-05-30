import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationDate = Date.now() + 20 * 24 * 60 * 60 * 1000; // 20 days
      localStorage.setItem("expirationDate", expirationDate);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationDate");
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
