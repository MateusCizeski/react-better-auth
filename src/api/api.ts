import axios from "axios";
import store from "@/redux/store";
import user from "@/services/user";
import { setBearerToken } from "@/redux/slice/user";

interface RefreshQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

const api = axios.create({
  baseURL: "https://meuservidorubuntu.com.br/users",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
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

let isRefreshing = false;
let queue: RefreshQueueItem[] = [];

const processQueue = (error: unknown, token: string | null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const state = store.getState();
      const result = await user.refresh(state.user.refreshToken);
      const newToken = result.content.token;

      store.dispatch(setBearerToken(newToken));

      processQueue(null, newToken);

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
