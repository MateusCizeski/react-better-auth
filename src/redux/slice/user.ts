import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  bearerToken: "",
  name: "",
  email: "",
  userName: "",
  refreshToken: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.bearerToken = action.payload.content.token;
      state.name = action.payload.content.name;
      state.email = action.payload.content.email;
      state.userName = action.payload.content.userName;
      state.refreshToken = action.payload.content.refreshToken;
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
      state.bearerToken = "";
      state.name = "";
      state.email = "";
      state.userName = "";
      state.refreshToken = "";
    },
  },
});

export const { logout, login, loginSignIn } = userSlice.actions;
export default userSlice.reducer;
