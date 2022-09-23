import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isLoading: false },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      window.localStorage.setItem("isLoggedIn", true);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoading = true;
      setTimeout(() => {
        window.localStorage.removeItem("isLoggedIn");
        window.location.reload();
        state.isLoading = false;
      }, 1500);
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectLoadingState = (state) => state.auth.isLoading;
