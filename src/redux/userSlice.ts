import { createSlice, type PayloadAction } from "@reduxjs/toolkit";const initialState = {
  token: localStorage.getItem("token") || "",
  user: null as null | { name: string; email: string; },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.token = "";
      state.user = null;
      localStorage.removeItem("token");
    }
  }
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;