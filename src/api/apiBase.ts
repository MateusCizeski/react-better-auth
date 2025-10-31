import axios from "axios";

const apiBase = axios.create({
  baseURL: "https://localhost:7117/",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiBase;
