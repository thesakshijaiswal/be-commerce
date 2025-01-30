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
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
