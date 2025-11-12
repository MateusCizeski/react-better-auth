import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  bearerToken: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.bearerToken = action.payload.content.token;
    },
    setEmail: (state, action) => {
      state.email = action.payload.Email;
    },
    loginSignIn: (state, action) => {
      state.isAuthenticated = true;
      state.bearerToken = action.payload.Content.Token;
      state.name = action.payload.Content.Nome;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.name = "";
      state.email = "";
      state.bearerToken = "";
    },
  },
});

export const { logout, login, loginSignIn } = userSlice.actions;
export default userSlice.reducer;
