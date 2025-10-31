import axios from "axios";
import store from "@/redux/store";

const api = axios.create({
  baseURL: "https://localhost:7117/",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (reqConfig) => {
    try {
      const state = store.getState();
      const authToken = state.user.bearerToken;
      reqConfig.headers["Authorization"] = `Bearer ${authToken}`;
    } catch (err) {
      return Promise.reject(err);
    }
    return reqConfig;
  },
  (err) => Promise.reject(err)
);

export default api;
