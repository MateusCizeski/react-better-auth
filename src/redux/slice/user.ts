import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
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
      state.id = action.payload.id;
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
    updateUser: (state, action) => {
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.userName !== undefined) {
        state.userName = action.payload.userName;
      }
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
    }
  },
});

export const { logout, login, loginSignIn, updateUser } = userSlice.actions;
export default userSlice.reducer;
